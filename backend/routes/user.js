const express = require("express");
const { z } = require("zod");
const {User} = require("../db");
const router = express.Router();
const JWT_SECRET = require("../config")
const jwt = require("jsonwebtoken")

const signupSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
});

router.post('/signup', async (req, res) => {
   const body = req.body;
   const {success} = signupSchema.safeParse(req.body);
   if (!success) {
    return res.json({
        message: "Email already taken / Incorrect inputs"
    })
   }

   const user = User.findOne({
    username: body.username
   })

   if (user._id) {
    return res.json({
        message: "Email already taken / Incorrect inputs"
    })
   }
   
   const dbUser = await User.create(body);
   const token = jwt.sign({
    userId: dbUser._id
   }, JWT_SECRET)
   res.json({
    message: "User created successfully",
    token: token
   })
});


router.listen(3000, () => {
    console.log('Server is running on port 3000');
});


module.exports = router;