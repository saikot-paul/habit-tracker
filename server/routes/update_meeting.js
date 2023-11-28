const express = require('express');
const { db } = require('./config/firebase_admin');
const router = express.Router();

router.post('/update_meeting', async (req, res) => {

    const uid = req.body.uid 
    const start_time = req.body.start_time
    const end_time = req.body.end_time
    const description = req.body.description
    const docID = req.body.docID

    const new_data = { 
        uid: uid,
        start_time: start_time,
        end_time: end_time,
        description: description,
        docID: docID,
    }

    try { 
       
        await db.collection('meeting').doc(docID).update(new_data)
        res.status(200).json({ message: 'Task updated successfully' });
       
    }catch(error) {
        console.error("Error updating task: ", error);
        res.status(500).json({ message: 'Error updating task' });
    }
});

module.exports = router;
