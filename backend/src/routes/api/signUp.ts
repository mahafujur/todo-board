import express, {Request, Response} from 'express';
import {body} from 'express-validator';
import {User} from '../../models/user';
import generateToken from '../../utils/api-utils/generateToken';
import {validateRequest} from '../../utils/api-utils/validateRequest';

const router = express.Router();

router.post(
    '/signup',
    [
        body('email').isEmail().withMessage('Provide a valid email.'),
        body('password')
            .trim()
            .isLength({min: 4, max: 20})
            .withMessage('Password must be between 4 and 20 characters.'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const {email, password} = req.body;

        try {
            const existingUser = await User.findOne({email});

            if (existingUser) {
                return res.status(400).send({error: 'Email already in use.'});
            }

            const user = User.build({email, password}); // Password will be hashed by Passport.js local strategy
            await user.save();

            generateToken(res, user.id, user.email);

            res.status(201).send(user);
        } catch (err) {
            console.error('Error during signup:', err);
            res.status(500).send({error: 'Internal server error.'});
        }
    }
);

export {router as signUpRouter};
