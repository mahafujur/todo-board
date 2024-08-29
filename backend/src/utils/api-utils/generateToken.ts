import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const generateToken = (
    userId: mongoose.Types.ObjectId,
    userEmail: string
): string => {
    // Create a new JSON Web Token with id, email, and secret key
    const jwtToken = jwt.sign(
        { id: userId, email: userEmail },
        process.env.JWT_KEY!,
        {
            expiresIn: process.env.JWT_TOKEN_DURATION,
        }
    );

    return jwtToken;
};

export default generateToken;
