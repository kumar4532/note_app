import { Request, Response } from "express"
import User from "../models/user.model";
import generateTokenAndSetCookies from "../utils/generateTokens";
import bcrypt from 'bcryptjs'

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
            password: hashedPassword
        })

        generateTokenAndSetCookies(newUser._id, res);
        res.status(200).json(newUser)
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

export {
    signup,
    signin,
    signout
}