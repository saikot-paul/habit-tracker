const express = require('express');
const { db } = require('./config/firebase_admin');
const router = express.Router();

router.post('/update_task', async (req, res) => {


    const uid = req.body.uid 
    const due_date = req.body.due_date
    const description = req.body.description
    const docID = req.body.docID

    console.log('Called update task')
    console.log(docID)

    const new_data = { 
        uid : uid, 
        due_date : due_date, 
        description : description
    }


    try { 
        
        await db.collection('tasks').doc(docID).update(new_data)
        res.status(200).json({ message: 'Task updated successfully' });
       
    }catch(error) {
        console.error("Error updating task: ", error);
        res.status(500).json({ message: 'Error updating task' });
    }
});

module.exports = router;
