import express from 'express'
import { login } from '../controllers/auth.js'

// create a router to enable the use of routes so that the code is cleaner
const router = express.Router()

// create a route for the login function
router.post('/login', login);

// export the router so that it can be used in index.js
export default router