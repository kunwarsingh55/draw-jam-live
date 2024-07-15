const z = require('zod');

const userValidations = z.object({
    username: z.string({
        required_error: "Username required"
    }).min(6, 'Username must be of atleast 6 characters'),
    email: z.string({
        required_error: "Email required"
    }).email(),
    password: z.string({
        required_error: "Password required"
    }).min(8, 'Password must be of atleast 8 characters')
})


// const usernameSchema = z.string({
//     required_error: "Username required"
// }).min(6, 'Username must be of atleast 6 characters')

// const emailSchema = z.string().email({
//     required_error: "Email required"
// })

// const passwordSchema = z.string({
//     required_error: "Password reuired"
// }).min(8, 'Password must be of atleast 8 characters')

module.exports = {
    userValidations
}