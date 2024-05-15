import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db/connectDB.js'
import cookieParser from 'cookie-parser'
import userRoutes from './routes/userRoutes.js'

dotenv.config()
connectDB()
const app = express()

const PORT = process.env.PORT || 1000

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())


//routes
app.use('/api/users',userRoutes)


app.listen(PORT,()=>{
    console.log(`Server Started at ${PORT}`);
})