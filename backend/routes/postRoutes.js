import protectRoute from '../middlewares/protectRoute.js'
import express from 'express'
import { createPost, deletePost, getFeed, getPost, likeUnlikePost, replyPost } from '../controllers/postController.js';

const router = express.Router()
router.get('/:id', getPost)
router.get('/feed', protectRoute ,getFeed)
router.post('/create', protectRoute ,createPost);
router.delete('/:id', protectRoute ,deletePost)
router.post("/like/:id", protectRoute, likeUnlikePost)
router.post("/reply/:id", protectRoute, replyPost)
export default router