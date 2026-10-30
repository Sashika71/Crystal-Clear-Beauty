import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRouter from './routes/userRouter.js';
import jwt from 'jsonwebtoken';
import productRouter from './routes/productRouter.js';
import { verifyJWT } from './middlewear/auth.js';
import orderRouter from './routes/orderRouter.js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import reviewRouter from "./routes/reviewRouter.js";
import chatRouter from './routes/chatRouter.js';
   
const mongoUri = process.env.MONGODB_URI;

let app=express();

app.use(cors());


app.use(bodyParser.json());
app.use('/api/chat', chatRouter);
app.use(verifyJWT);


app.use("/api/user",userRouter);
app.use('/api/product',productRouter);
app.use('/api/order',orderRouter);
app.use('/api/review',reviewRouter);
app.get('/',
    (req,res)=>{
        Student.find().then(
            (students)=>{
                res.json(students)
            }
        )
        .catch(()=>{
            res.json(
                {
                    message:"error occured"
                }
            )
        })
     
})






async function startServer() {
    if (!mongoUri) {
        throw new Error('MONGODB_URI is not configured');
    }

    await mongoose.connect(mongoUri);
    console.log('connected to mongodb');

    app.listen(5000,()=>{
        console.log('server is running on port 5000');
    });
}

startServer().catch((error) => {
    console.error('connection failed:', error.message);
    process.exitCode = 1;
});
