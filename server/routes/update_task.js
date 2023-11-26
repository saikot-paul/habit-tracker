const express = require('express');
const { db } = require('./config/firebase_admin');
const router = express.Router();

router.patch('/update_task/:taskId', async (req, res) => {
    try {
        const uid = req.body.uid;
        const taskId = req.params.taskId; // Get taskId from URL params
        const description = req.body.description;
        const due_date = req.body.due_date;

        const data = {
            uid: uid,
            due_date: due_date,
            description: description,
        };

        const taskRef = db.collection('tasks').doc(taskId);
        await taskRef.set(data, { merge: true }); // Use merge option to update specific fields

        res.status(200).json({ success: true, data: data });
    } catch (error) {
        console.log(error);
        let message = 'Error updating task';
        let statusCode = 500;

        return res.status(statusCode).json({ success: false, message: error.message });
    }
});

module.exports = router;