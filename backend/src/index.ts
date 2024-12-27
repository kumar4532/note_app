import express from 'express';
import connectDB from './db/connectDB';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'
import cors from 'cors'

import authRoutes from './routers/auth.routes'
import noteRoutes from './routers/note.routes'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ["GET", "POST", "DELETE"],
    credentials: true
}))

app.use("/api/auth", authRoutes);
app.use("/api/note", noteRoutes);

connectDB()
    .then(() => {
        app.listen(PORT, () =>{
            console.log(`Server is running at port : ${PORT}`);
        })
    })
    .catch((err) => {
        console.log("MONGODB connection Failed !!!", err);
    })