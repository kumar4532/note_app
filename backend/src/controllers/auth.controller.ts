import { Request, Response } from "express"
import User from "../models/user.model";
import generateTokenAndSetCookies from "../utils/generateTokens";
import bcrypt from 'bcryptjs'
import { OAuth2Client } from 'google-auth-library';
import nodemailer from 'nodemailer'
import { Types } from "mongoose";
import Otp from "../models/otp.model";
import dotenv from 'dotenv'

dotenv.config()

interface VerifyOtpRequest {
    userId: string;
    otp: string;
}

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.AUTH,
        pass: process.env.PASS
    }
})

const signup = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        const alreadyExists = await User.findOne({ email })

        if (alreadyExists) {
            res.status(400).json("User already exists")
            return
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            verified: false,
        })
       
        const otpInfo = await sendVerificationEmail(newUser, res);
        
        res.status(200).json(otpInfo)
    } catch (error) {
        console.log("Error while signing up", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const signin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const userFound = await User.findOne({ email });

        if (!userFound) {
            res.status(404).json("Invalid Email Id");
            return
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            userFound?.password || ""
        );

        if (!isPasswordCorrect) {
            res.status(404).json("Password is Incorrect");
            return
        }

        generateTokenAndSetCookies(userFound._id, res);
        res.status(200).json(userFound);
    } catch (error) {
        console.log("Error while logging in", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const signout = (req: Request, res: Response) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error: any) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const googleAuth = async (req: Request, res: Response) => {
    try {
        const { credential } = req.body;

        const ticket = await googleClient.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        const payload = ticket.getPayload();
        if (!payload) {
            res.status(400).json("Invalid Google token");
            return;
        }

        const { email, name, sub: googleId } = payload;

        let user = await User.findOne({ email });

        if (user) {
            if (user.authType === 'local') {
                res.status(400).json("Email already registered. Please sign in with password");
                return;
            }
        } else {
            user = await User.create({
                name,
                email,
                googleId,
                authType: 'google'
            });
        }

        generateTokenAndSetCookies(user._id, res);
        res.status(200).json(user);

    } catch (error) {
        console.log("Error in Google authentication:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const sendVerificationEmail = async ({ _id, email }: { _id: Types.ObjectId, email: string }, res: Response) => {
    try {
        const otp = `${Math.floor(1000 + Math.random() * 9000)}`

        const mailOptions = {
            from: process.env.AUTH,
            to: email,
            subject: "Verify Your Email",
            html: `<p>Enter ${otp} for verifying your email.</p>`
        }

        const salt = 10

        const hashedOtp = await bcrypt.hash(otp, salt);

        const newOtpVerification = new Otp({
            userId: _id,
            otp: hashedOtp,
            createdAt: Date.now(),
            expiresAt: Date.now() + 3600000,
        })

        await newOtpVerification.save();
        await transporter.sendMail(mailOptions);

        return newOtpVerification;
    } catch (error) {
        console.log("Error while sending verification mail", error)
    }
}

const verifyOtp = async (req: Request, res: Response) => {
    try {
        const { id: userId, otp } = req.body;

        if (!otp) {
            res.status(400).json("Wrong OTP");
            return;
        }

        const otpRecord = await Otp.findOne({ userId });

        if (!otpRecord) {
            throw new Error("Account record doesn't exist. Please sign-in or sign-up");
        }

        const { otp: hashedOtp, expiresAt } = otpRecord;

        if (!hashedOtp) {
            throw new Error("OTP record is corrupted or incomplete");
        }

        if (!expiresAt) {
            throw new Error("OTP expiry date is missing");
        }

        const expiryTimestamp = new Date(expiresAt).getTime();
        if (Date.now() > expiryTimestamp) {
            throw new Error("OTP has expired");
        }

        const validOtp = await bcrypt.compare(otp, hashedOtp);

        if (!validOtp) {
            throw new Error("Invalid OTP");
        }

        await User.updateOne({ _id: userId }, { verified: true });
        await Otp.deleteMany({ userId });

        const verifiedUser = await User.findById(userId)

        generateTokenAndSetCookies(userId, res);

        res.status(200).json(verifiedUser);
    } catch (error: any) {
        console.error("Error while verifying OTP:", error);
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
};

export {
    signup,
    signin,
    signout,
    googleAuth,
    verifyOtp
}