import protectRoute from '../middlewares/protectRoute.js'
import express from 'express'
import { createPost } from '../controllers/postController.js';

const router = express.Router()

router.post('/create', protectRoute ,createPost);

export default router