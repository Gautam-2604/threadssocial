import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db/connectDB.js'
import cookieParser from 'cookie-parser'
import userRoutes from './routes/userRoutes.js'
import postRoutes from './routes/postRoutes.js'
import { v2 as cloudinary} from 'cloudinary'



dotenv.config()
connectDB()
const app = express()

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const PORT = process.env.PORT || 1000

app.use(express.json({limit:"50mb"}));
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())


//routes
app.use('/api/users',userRoutes)
app.use('/api/posts',postRoutes)


app.listen(PORT,()=>{
    console.log(`Server Started at ${PORT}`);
})