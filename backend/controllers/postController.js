import User from '../models/userModel.js'
import Post from '../models/postModel.js'
const createPost = async (req,res)=>{
    try {
        const {postedBy,text,img}= req.body
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
export { createPost, getPost, deletePost, likeUnlikePost}