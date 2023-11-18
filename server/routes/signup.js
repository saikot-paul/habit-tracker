const express = require('express');
const {admin, db} = require('./config/firebase_admin')
const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        const userRecord = await admin.auth().createUser({
            email: req.body.email,
            password: req.body.password
        });

        const userData = {
            username: req.body.username,
            email : req.body.email, 
            uid: userRecord.uid
        };

        const response = await db.collection('users').doc(userRecord.uid).set(userData);

        return res.status(200).json({ success: true, user: { uid: userRecord.uid, email: userRecord.email } });

    } catch (error) {

        console.log(error)
        let message = 'Error creating user';
        let statusCode = 500;

        if (error.code === "auth/email-already-exists") {
            message = 'Email already exists';
            statusCode = 409;
        }

        return res.status(statusCode).json({ success: false, message: error.message });
    }
});

module.exports = router;
