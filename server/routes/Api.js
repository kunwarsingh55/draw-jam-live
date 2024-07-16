const express = require('express');
const router = express.Router();
const Session = require('../models/Session'); // Import the Session model

// Create whiteboard session
router.post('/sessions', async (req, res) => {
    let userId = req.body.userId;
    if (!userId) return res.status(400).json({ msg: "Bad request" });

    try {
        // New session with random session ID
        let newSession = new Session({ userId: userId });
        await newSession.save();

        res.status(200).json({ newSession });
    } catch (err) {
        console.error("Error during session creation [/api/sessions]:", err);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});

// Update session, using session id
router.put('/sessions', async (req, res) => {
    let { sessionData, sessionId } = req.body;

    if (!sessionData || !sessionId) return res.status(400).json({ msg: "Bad request" });

    try {
        const updatedSession = await Session.findOneAndUpdate(
            { sessionId: sessionId },
            { sessionData: sessionData },
            { new: true }
        );

        if (!updatedSession) {
            return res.status(404).json({ msg: "Session not found" });
        }

        res.status(200).json({ msg: "Session Updated" });
    } catch (err) {
        console.error("Error during session update [/api/sessions]:", err);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});

// Retrieve all sessions of passed userId
// TODO: add JWT to pass userId, and use .get instead
router.post('/sessions/all', async (req, res) => {
    let userId = req.body.userId;
    if (!userId) return res.status(401).json({ msg: "Bad request" });

    try {
        let savedSessions = await Session.find({ userId: userId });
        res.status(200).json({ sessions: savedSessions });
    } catch (err) {
        console.error("Error during session retrieve [/api/sessions]:", err);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});

// Get session by ID
router.get('/sessions/:sessionId', async (req, res) => {
    let sessionId = req.params.sessionId;
    if (!sessionId) return res.status(401).json({ msg: "Bad request" });

    try {
        let session = await Session.findOne({ sessionId: sessionId });
        if (!session) {
            return res.status(404).json({ msg: "Session not found" });
        }
        res.status(200).json({ session: session });
    } catch (err) {
        console.error("Error during session retrieve by ID [/api/session]:", err);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});

module.exports = router;
