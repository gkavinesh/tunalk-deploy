import express from "express"
import cors from "cors"
import mongoose from "mongoose";
import { connectDB } from "./config/db.js"
import productRouter from "./routes/productRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config'

//app config

const app = express()
const port = 4000

//middleware

app.use(express.json())
app.use(cors())

//db connection

connectDB();

//api endpoint
app.use("/api/product",productRouter);
app.use("/images",express.static("uploads"));
app.use("/api/user",userRouter);

app.get('/',(req,res)=>{
    res.send('API Working')
})

app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`)
})

//mongodb+srv://flickerintwitter:<password>@cluster0.zyqpyyz.mongodb.net/?
