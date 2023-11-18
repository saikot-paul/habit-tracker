const express = require('express');
const { db } = require('./config/firebase_admin');
const router = express.Router();

router.get('/fetch_data', async (req, res) => {
    console.log('Called fetch data');
    const uid = req.query.uid;

    console.log(uid)

    // Define the queries for each collection
    const tasksQuery = db.collection('tasks').where('uid', '==', uid).get();
    const meetingsQuery = db.collection('meeting').where('uid', '==', uid).get();
    const remindersQuery = db.collection('reminder').where('uid', '==', uid).get();

    try {
        // Execute all queries concurrently
        const [tasksSnapshot, meetingsSnapshot, remindersSnapshot] = await Promise.all([tasksQuery, meetingsQuery, remindersQuery]);

        // Process each query snapshot to extract data
        const tasks = tasksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const meetings = meetingsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const reminders = remindersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Send the aggregated results
        res.status(200).json({ tasks, meetings, reminders });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error fetching data' });
    }
});

module.exports = router;
