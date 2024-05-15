import User from "../models/userModel.js";
import brcypt from 'bcryptjs'
import generateTokenAndSetCookie from "../utils/helpers/generateTokenAndSetCookie.js";

const signupUser = async(req,res)=>{
    try {
        const {name,email,username,password}= req.body
        const user = await User.findOne({$or:[{email},{username}]});
        if(user){
            return res.status(400).json({
               message:"User exists"
            })
        }

        const salt = await brcypt.genSalt(10)
        const hashedPassword = await brcypt.hash(password,salt)

        const newUser = new User({
            name,
            email,
            username,
            password: hashedPassword
        })
        await newUser.save()

        if(newUser){
            generateTokenAndSetCookie(newUser._id,res)
            res.status(201).json({
                 _id:newUser._id,
                name:newUser.name,
                email: newUser.email,
                username: newUser.username})
        }
        else{
            res.status(400).json({message:"Something went wrong"})
        }
    } catch (error) {
        res.status(500).json({message:error.message})
        console.log("Error in signup user = ", error.message);
    }
}

const loginUser = async(req,res)=>{
    try {
        const {username,password}=req.body;
        const user = await User.findOne({username});
        if(!user){
            res.status(400).json({message:"Username doest not exists"})
        }
        const isPasswordCorrect = await brcypt.compare(password,user?.password)
        if(!isPasswordCorrect){
            res.status(400).json({message:"Password incorrect"})
        }

        generateTokenAndSetCookie(user._id,res)
        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            username:user.username
        })
    } catch (error) {
        res.status(500).json({message:"Error is Login User"})
        console.log(error.message);
    }
}

const logoutUser = async(req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:1});
        res.status(200).json({message:"User logged out successfully"})
    } catch (error) {
        res.status(500).json({message:"Error while logging out"});
        console.log(error.message);
    }
}
//for follow and unFollow
const followUser = async(req,res)=>{
    try {
        const {id}= req.params;
        //user to be followed or unfollowed
        const userToModify = await User.findById(id);
        const currentUser = await User.findById(req.user._id)

        if(id===req.user._id){
            res.status(400).json({message:"You cannot follow/Unfollow yourself"})
        }

        if(!userToModify || !currentUser){
            res.status(400).json({message:"No User found"})
        }

        const isFollowing = currentUser.following.includes(id)
        if(isFollowing){
            await User.findByIdAndUpdate(req.user._id,{$pull:{following:id}})
            await User.findByIdAndUpdate(id,{$pull:{followers:req.user._id}})
            res.status(200).json({message:"User Unfollowed successfully"})
        }
        else{
            await User.findByIdAndUpdate(req.user._id,{$push:{following:id}})
            await User.findByIdAndUpdate(id,{$push:{followers:req.user._id}})
            res.status(200).json({message:"User followed successfully"})
        }

    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const updateUser = async(req,res)=>{
    const {name, email, username, password, profilePic, bio} = req.body;
        const userId = req.user._id;
    try {
        let user = User.findById(userId)
        if(!user){
            res.json(400).json({message:"User not found"})
         }
         if (req.params.id !== userId.toString())
			return res.status(400).json({ error: "You cannot update other user's profile" });
         if(password){
            const salt = await brcypt.genSalt(10);
            const hashedPassword = await brcypt.hash(password,salt);
            user.password= hashedPassword
        }
        user.name = name || user.name;
        user.bio = bio || user.bio;
        user.profilePic = profilePic || user.profilePic;
        user.username = username || user.username;
        user.email = email || user.email;

        user = await user.save()
        res.status(200).json({message:"Profile updated!!"})

    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const getUserProfile = async(req,res)=>{
    const {username} = req.params
    try {
        const user = User.findOne({username}).select("-password").select("-updatedAt")
        if (!user){
            res.status(400).json({message:"User not found"})
        }

        res.status(200).json(user)

    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

export {signupUser, loginUser, logoutUser, followUser, updateUser, getUserProfile}