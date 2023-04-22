import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/* REGISTER */
// async call is used to avoid the use of .then() and .catch() because it is cleaner
// async is used to tell the function that it will return a promise
// async has the advantage of being able to use await inside the function to wait for a promise to resolve
// req is the request from the client to the server
// res is the response from the server to the client
export const register = async (req, res) => {
    try {
        // destructure the request body to get the data from the client
        const {firstName, lastName, email, password, picturePath, friends, location, occupation} = req.body

        // salt is used to hash the password and make it more secure by adding random characters to the password
        const salt = await bcrypt.genSalt(10)
        // hash the password
        const passwordHash = await bcrypt.hash(password, salt)

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            profilePicture: picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 1000),
            impressions: Math.floor(Math.random() * 1000),
        });

        // save the new user to the database
        const savedUser = await newUser.save()

        // send the saved user as a response to the client
        res.status(201).json(savedUser)
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}

/* LOGIN */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        // check if the email is in the database
        const User = await User.findOne({ email: email })
        if (!User) return res.status(400).json({msg: "User does not exist"})

        // compare the password from the client with the password in the database
        const isMatch = await bcrypt.compare(password, User.password)
        if (!isMatch) return res.status(400).json({msg: "Invalid credentials"})

        // create a token to authenticate the user
        const token = jwt.sign({ is: User._id }, process.env.JWT_SECRET)

        delete User.password

        res.status(200).json({ token, User})

    } catch (err) {
        res.status(500).json({error: err.message})
    }
}