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


export {signupUser, loginUser}