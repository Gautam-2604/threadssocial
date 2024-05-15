import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db/connectDB.js'

dotenv.config()
connectDB()
const app = express()

const PORT = process.env.PORT || 1000

app.listen(PORT,()=>{
    console.log(`Server Started at ${PORT}`);
})