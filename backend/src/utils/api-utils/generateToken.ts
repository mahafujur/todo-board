import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const generateToken = (
    userId: mongoose.Types.ObjectId,
    userEmail: string,
    name:string
): string => {
    // Create a new JSON Web Token with id, email, and secret key
    const jwtToken = jwt.sign(
        { id: userId, email: userEmail,name },
        process.env.JWT_KEY!,
        {
            expiresIn: process.env.JWT_TOKEN_DURATION,
        }
    );

    return jwtToken;
};

export default generateToken;
