import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";
import User from "../models/user.model";

interface DecodedToken extends JwtPayload {
	userId: string;
}

declare global {
    namespace Express {
        export interface Request {
            user: {
                _id: Types.ObjectId;
                name: string;
                email: string;
            };
        }
    }
}

const protectRoute = async (req: Request, res: Response, next: NextFunction) => {
	try {
		console.log("this is cookie",req.cookies);
		
		const token = req.cookies.jwt;

		if (!token) {
            res.status(401).json({ error: "Unauthorized - No token provided" });
			return 
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;

		if (!decoded) {
            res.status(401).json({ error: "Unauthorized - Invalid Token" });
			return 
		}

		const user = await User.findById(decoded.userId).select("-password")

		if (!user) {
            res.status(404).json({ error: "User not found" });
			return 
		}

		req.user = user;

		next();
	} catch (error: any) {
		console.log("Error in protectRoute middleware", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export default protectRoute;