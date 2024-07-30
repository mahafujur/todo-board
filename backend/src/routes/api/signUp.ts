import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { User } from '../../models/user';
import { Password } from '../../utils/api-utils/password';
import generateToken from '../../utils/api-utils/generateToken';
import { validateRequest } from '../../utils/api-utils/validateRequest'; // Custom validation function

const router = express.Router();

router.post(
    '/signup',
    [
        body('email').isEmail().withMessage('Provide a valid Email'),
        body('password')
            .trim()
            .isLength({ min: 4, max: 20 })
            .withMessage('Password must be between 4 and 20 characters'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
            return res.status(400).send({ error: 'Email already exists.' });
        }

        const hashedPassword = await Password.toHash(password); // Ensure password is hashed
        const user = User.build({ email: email, password: hashedPassword });
        await user.save();

        generateToken(res, user.id, user.email);

        res.status(201).send(user);
    }
);

export { router as signUpRouter };
