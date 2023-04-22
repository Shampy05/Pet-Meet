import express from 'express'
import {
    getUser,
    getUserFriends,
    addRemoveFriends,
} from '../controllers/users.js'
import {verifyToken} from "../middleware/auth.js";

// create a router to enable the use of routes so that the code is cleaner
const router = express.Router()

router.get('/:id', verifyToken, getUser)
router.get('/:id/friends', verifyToken, getUserFriends)

router.patch(':id/:friendId', verifyToken, addRemoveFriends)

export default router 