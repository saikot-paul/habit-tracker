const express = require('express');
const { db } = require('./config/firebase_admin');
const router = express.Router();

router.delete('/delete_meeting', async (req, res) => {
    
    console.log('Called Delete Reminder');
    
    const id = req.query.id
    const uid = req.query.uid

    console.log(id)
    console.log(uid)

    try { 

        const docRef = db.collection('meeting').doc(id);
        let doc = await docRef.get();
    
        if (!doc.exists) {
            return res.status(404).json({ message: "Document not found" });
        }
    
        console.log("Before deletion, exists:", doc.exists);
        await docRef.delete();
    
        doc = await docRef.get();
        console.log("After deletion, exists:", doc.exists);

        res.status(200).json({message : "Document successfully deleted", success : true})
    }catch (error) { 
        console.log(error)
        res.status(500).json({message : "Error Deleting Document"})
    }

});

module.exports = router;