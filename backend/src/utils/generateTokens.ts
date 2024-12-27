import { Types } from "mongoose";
import { Response } from "express"
import jwt from "jsonwebtoken"

const generateTokenAndSetCookies = (userId: Types.ObjectId, res: Response) => {
    const secret = process.env.JWT_SECRET;
    console.log("this is secret",secret);

    if (!secret) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const token = jwt.sign({ userId }, secret, {
        expiresIn: "15d"
    })
    console.log("this is token",token);
    

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production"
    })
}

export default generateTokenAndSetCookies