import User from '../models/userModel.js'
import Post from '../models/postModel.js'
import { v2 as cloudinary} from 'cloudinary'
const createPost = async (req,res)=>{
    try {
        const {postedBy,text}= req.body
        let {img} = req.body
        if(!postedBy || !text ){
            return res.status(400).json({message:"Please fill the necessary fields"})
        }
        const user = await User.findById(postedBy)
        if(!user){
            return res.status(404).json({message:"No user found"})
        }

        if(user._id.toString() !== req.user._id.toString() ){
            return res.status(401).json({message:"Unauthorised"})
        }

        const maxLength = 500;
        if(text.length > maxLength){
            return res.status(400).json({message:"Text too long"})
        }

        if(img){
            const uploadedResponse = await cloudinary.uploader.upload(img);
            img= uploadedResponse.secure_url
        }

        const newPost = new Post({postedBy,text,img})
        await newPost.save()
        res.status(200).json({message:"New post created successfully",newPost})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const getPost = async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id)
        if(!post){
            req.status(404).json({message:"Post not found"})
        }
        res.status(200).json({message:"Post found",post})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const deletePost = async(req,res)=>{
    try {
        const post = Post.findById(req.params.id)
        if(!post){
            res.status(404).json({message:"Post not found"})
        }
        if(post.postedBy.toString()!==req.user._id.toString()){
            res.status(400).json({message:"Unauthorised"})
        }
        await Post.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"Post deleted Successfully"})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const likeUnlikePost = async (req,res)=>{
    try {
        const {id:postId} = req.params
        const userId = req.user._id
        const post = await Post.findById(postId)
        if(!post){
            res.status(404).json({message:"Post not found"})
        }
        const userLikesPost = post.likes.includes(userId)
        if(userLikesPost){
            //unlike Post
            await Post.updateOne({_id:postId},{$pull:{likes:userId}})
            res.status(200).json({message:"Post unliked successsfully"})
        }else{
            //like Post
            
            await Post.updateOne({_id:postId},{$push:{likes:userId}}) 
            res.status(200).json({message:"Post liked successsfully"})
        }
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const replyPost = async(req,res)=>{
    try {
        const {text} = req.body
        const {id:postId} = req.params
        const userId = req.user._id
        const userProfilePic = req.user.profilePic
        const username = req.user.username

        if(!text){
            res.status(400).json({message:"No reply"})
        }

        const post = await Post.findById(postId)
        if(!post){
            res.status(404).json({message:"Post not found"})
        }

        const reply = {userId, userProfilePic,username, text}
        post.replies.push(reply)
        await post.save()
        res.status(200).json({message:"Reply added successfully", post})

    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const getFeed = async(req,res)=>{
    try {
        const userId = req.user?._id;
        const user  = await User.findById(userId)
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        const following = user.following
        const feedPosts = await Post.find({postedBy:{$in:following}}).sort({createdAt : -1})
        res.status(200).json(feedPosts)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

export { createPost, getPost, deletePost, likeUnlikePost, replyPost, getFeed}