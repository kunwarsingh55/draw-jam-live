const express = require('express');
const router = express.Router();

const { userValidations } = require('../validations/User');

const Prisma = require('@prisma/client');
const prisma = new Prisma.PrismaClient()



// validation when username not required
const userValidationPartial = userValidations.partial({
    username: true
})


router.post("/signup", async (req, res) => {

    let { username, email, password } = req.body;

    try {

        // Validate input
        let user = userValidations.safeParse({ username, email, password });
        if (!user.success) {
            let validationErrors = user.error.issues.map(error => error.message);
            return res.status(400).json({ msg: validationErrors })
        }

        // check if user exists already
        const dupUser = await prisma.user.findFirst({
            where: {
                email: email
            },
        })

        if (dupUser) {
            return res.status(409).json({ msg: "User with this email already exists" });
        }

        // TODO : hash passwords
        // create user
        await prisma.user.create({
            data: {
                username: user.data.username,
                email: user.data.email,
                password: user.data.password
            },
        })

        const allUsers = await prisma.user.findMany({})
        console.log(allUsers, { depth: null })


        res.status(201).json({ msg: "User Created" });

    } catch (err) {
        console.error("Error during signup [/auth/signup]:", err);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});

router.post("/login", async (req, res) => {

    let { email, password } = req.body;

    try {

        // Validate input
        let user = userValidationPartial.safeParse({ email, password });
        if (!user.success) {
            let validationErrors = user.error.issues.map(error => error.message);
            return res.status(400).json({ msg: validationErrors })
        }

        // Check if user exists
        const userCheck = await prisma.user.findFirst({
            where: {
                email: email
            },
        })
        if (!userCheck) {
            return res.status(409).json({ msg: "User does not exists" });
        }

        // TODO : json web token
        if (userCheck.password === user.data.password) {
            console.log(userCheck);
            return res.status(200).json({ username: userCheck.username, userId: userCheck.id })
        }
        else {
            return res.status(409).json({ msg: "Wrong credentials" });
        }


    } catch (err) {
        console.error("Error during login [/auth/login]:", err);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});


module.exports = router;