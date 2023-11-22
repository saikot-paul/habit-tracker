const express = require('express');
const { db } = require('./config/firebase_admin');
const router = express.Router();

router.post('/create_meeting', async(req, res) => {
    try{
        const uid = req.body.uid;
        const description = req.body.description;
        const start_time = req.body.start_time;
        const end_time = req.body.end_time;

        const data = {
            uid : uid, 
            start_time : start_time,
            end_time : end_time,
            description : description,
        }
        const response = await db.collection('meeting').doc().set(data);
        res.status(200).json({success : true, data : data})
    } catch(error){

        console.log(error)
        let message = 'Error creating meeting';
        let statusCode = 500;

        if (error.code === "auth/email-already-exists") {
            message = 'Email already exists';
            statusCode = 409;
        }

        return res.status(statusCode).json({ success: false, message: error.message });
    }
});

module.exports = router;