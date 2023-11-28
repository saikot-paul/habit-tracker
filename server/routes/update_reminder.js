const express = require('express');
const { db } = require('./config/firebase_admin');
const router = express.Router();

router.post('/update_reminder', async (req, res) => {

    const uid = req.body.uid 
    const date = req.body.date
    const description = req.body.description
    const docID = req.body.docID

    const new_data = { 
        uid: uid,
        date: date,
        description: description,
        docID: docID,
    }

    try { 
        await db.collection('reminder').doc(docID).update(new_data)
        res.status(200).json({ message: 'Task updated successfully' })
    }catch(error) {
        console.error("Error updating task: ", error);
        res.status(500).json({ message: 'Error updating task' });
    }
});

module.exports = router;
