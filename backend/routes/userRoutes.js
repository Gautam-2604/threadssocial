import express from 'express'
import { followUser, getUserProfile, loginUser, logoutUser, signupUser, updateUser } from '../controllers/userController.js'
import protectRoute from '../middlewares/protectRoute.js'

const router = express.Router()

router.post('/signup',signupUser)
router.post('/login',loginUser)
router.post('/logout',logoutUser)
router.post('/follow/:id',protectRoute,followUser)
router.post('/update/:id',protectRoute,updateUser)
router.get('/profile/:username',getUserProfile)


export default router