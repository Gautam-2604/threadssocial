import express from 'express'
import dotenv from 'dotenv'

dotenv.config()
const app = express()

const PORT = process.env.PORT || 1000

app.listen(PORT,()=>{
    console.log(`Server Started at ${PORT}`);
})