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

export { createPost}