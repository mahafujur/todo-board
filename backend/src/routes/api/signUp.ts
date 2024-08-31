// src/routes/auth/signup.ts
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { User } from '../../models/user';
import generateToken from '../../utils/api-utils/generateToken';
import { validateRequest } from '../../utils/api-utils/validateRequest';

const router = express.Router();

router.post(
    '/signup',
    [
        body('name').trim().notEmpty().withMessage('Name is required.'),
        body('email').isEmail().withMessage('Provide a valid email.'),
        body('password')
            .trim()
            .isLength({ min: 2, max: 30 })
            .withMessage('Password must be between 4 and 20 characters.'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { email, password, name } = req.body;

        try {
            const existingUser = await User.findOne({ email });

            if (existingUser) {
                return res.status(400).send({ error: 'Email already in use.' });
            }

            const user = User.build({ email, password, name }); // Include name in user creation
            await user.save();

            const token = generateToken(user.id, user.email);
            res.status(201).send({ user, token }); // Include token in response
        } catch (err) {
            console.error('Error during signup:', err);
            res.status(500).send({ error: 'Internal server error.' });
        }
    }
);

export { router as signUpRouter };
