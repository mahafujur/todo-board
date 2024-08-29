import {Response} from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const generateToken = (
    res: Response,
    userId: mongoose.Types.ObjectId,
    userEmail: string
) => {
    // Creating a new Json Web Token with id, email and secret key
    const jwtToken = jwt.sign(
        {id: userId, email: userEmail},
        process.env.JWT_KEY!,
        {
            expiresIn: process.env.JWT_TOKEN_DURATION,
        }
    );

    const cookieOptions = {
        httpOnly: process.env.NODE_ENV === 'production', // To prevent cookies from being accessed by client-side scripts
        secure:  true,// Value will be false in the development environment and hence http will be allowed in development
        sameSite: "none" as const,
        maxAge: 30 * 24 * 60 * 60 * 1000, // Sets expiry of cookie to 30 days
        path: '/', // Ensure path is set
    };

    res.cookie("token", jwtToken, cookieOptions);
};

export default generateToken;
