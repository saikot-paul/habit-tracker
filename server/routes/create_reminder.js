const express = require('express');
const { db } = require('./config/firebase_admin');
const router = express.Router();

router.post('/create_reminder', async(req, res) => {
    try{
        const uid = req.body.uid;
        const description = req.body.description;
        const date = req.body.date;

        const data = {
            uid : uid, 
            description : description,
            date : date,
        }
        const response = await db.collection('reminder').doc().set(data);
        res.status(200).json({success : true, data : data})
    } catch(error){

        console.log(error)
        let message = 'Error creating reminder';
        let statusCode = 500;

        if (error.code === "auth/email-already-exists") {
            message = 'Email already exists';
            statusCode = 409;
        }

        return res.status(statusCode).json({ success: false, message: error.message });
    }
});

module.exports = router;