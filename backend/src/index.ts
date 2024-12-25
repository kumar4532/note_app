import express from 'express';
import connectDB from './db/connectDB';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'

import authRoutes from './routers/auth.routes'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

connectDB()
    .then(() => {
        app.listen(PORT, () =>{
            console.log(`Server is running at port : ${PORT}`);
        })
    })
    .catch((err) => {
        console.log("MONGODB connection Failed !!!", err);
    })