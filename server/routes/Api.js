const express = require('express');
const router = express.Router();
const Prisma = require('@prisma/client');
const prisma = new Prisma.PrismaClient()


// create whiteboard session
router.post('/sessions', async (req, res) => {

    let userId = req.body.userId;
    if (!userId) return res.status(400).json({ msg: "Bad request" })

    try {

        // new session with random session ID
        let newSession = await prisma.session.create({
            data: {
                userId: userId
            }
        });
        res.status(200).json({
            newSession
        });

        // TODO : add error creating response
    } 
    catch (err) {
        console.error("Error during session creation [/api/sessions]:", err);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});


// update session, using session id
router.put('/sessions', async (req, res) => {

    let { sessionData, sessionId } = req.body;
    // console.log(sessionData, sessionId);

    if (!sessionData || !sessionId) return res.status(400).json({ msg: "Bad request" });

    try {
        const updatedSession = await prisma.session.update({
            where: {
                sessionId: sessionId
            },
            data: {
                sessionData: sessionData
            }
        })
        res.status(200).json({ msg: "Session Updated" });

        // TODO : add error updating response
    }
    catch (err) {
        console.error("Error during session updation [/api/sessions]:", err);
        res.status(500).json({ msg: "Internal Server Error" });
    }

});


// reterive all session of passed userId
// TODO : add jwt to pass userId, and use .get instead
router.post('/sessions/all', async (req, res) => {
    let userId = req.body.userId;
    if (!userId) return res.status(401).json({ msg: "Bad reuest" });

    try {
        let savedSessions = await prisma.session.findMany({
            where: {
                userId: userId
            }
        })
        res.status(200).json({
            sessions: savedSessions
        });

        // TODO : add error reading case response

    } catch (err) {
        console.error("Error during session retrieve [/api/sessions]:", err);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});


//get session by ID
router.get('/sessions/:sessionId', async (req, res) => {
    let sessionId = req.params.sessionId
    if (!sessionId) return res.status(401).json({ msg: "Bad reuest" });

    try {
        let session = await prisma.session.findFirst({
            where: {
                sessionId : sessionId
            }
        })
        res.status(200).json({
            session: session
        });

        // TODO : add error reading case response

    } catch (err) {
        console.error("Error during session retrieve by ID [/api/session]:", err);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});



module.exports = router;