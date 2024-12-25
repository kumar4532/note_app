import { Request, Response } from "express"
import User from "../models/user.model";
import generateTokenAndSetCookies from "../utils/generateTokens";
import bcrypt from 'bcryptjs'

const signup = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password } = req.body;

        const alreadyExists = await User.findOne({ email })

        if (alreadyExists) {
            res.status(400).json("User already exists")
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

const signin = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        const userFound = await User.findOne({ email });

        const isPasswordCorrect = await bcrypt.compare(
            password,
            userFound?.password || ""
        );

        if (!userFound) {
            res.status(400).json("Invalid Email Id");
            return
        }

        if (!isPasswordCorrect) {
            res.status(400).json("Password is Incorrect");
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
        res.cookie("jwt", "", { maxAge: 0 })
        res.status(200).json({
            message: "Logout successfully",
        })
    } catch (error) {
        console.log("Error while signning out", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export {
    signup,
    signin,
    signout
}