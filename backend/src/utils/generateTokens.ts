import { Types } from "mongoose";
import { Response } from "express"
import jwt from "jsonwebtoken"

const generateTokenAndSetCookies = (userId: Types.ObjectId, res: Response) => {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const token = jwt.sign({userId}, secret, {
        expiresIn: "15d"
    })

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict"
    })
}

export default generateTokenAndSetCookies