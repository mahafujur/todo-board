import {NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import {User} from '../models/user';
import mongoose from 'mongoose';

const auth = async (req: Request, res: Response, next: NextFunction) => {
    // Read token from cookies
    const token = req.cookies.token;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_KEY as string) as jwt.JwtPayload;

            // Find user based on decoded ID
            const userDoc = await User.findById(decoded.id).select('-password').exec();

            if (userDoc) {
                req.user = {
                    id: (userDoc._id as mongoose.Types.ObjectId).toString(), // Type assertion to ObjectId
                    email: userDoc.email,
                };
                next();
            } else {
                return res.status(401).json({message: 'User not found'});
            }
        } catch (err) {
            if (err instanceof Error) {
                console.error(err.message);
                res.status(401).json({message: 'Not authorized, token failed'});
            } else {
                console.error('Unexpected error', err);
                res.status(500).send('Server error');
            }
        }
    } else {
        res.status(401).json({message: 'Not authorized, no token'});
    }
};

export default auth;
