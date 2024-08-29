import express, { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import passport from '../../utils/api-utils/passport-config';
import { validateRequest } from '../../utils/api-utils/validateRequest';
import generateToken from '../../utils/api-utils/generateToken';

const router = express.Router();

router.post(
    '/signin',
    [
        body('email').isEmail().withMessage('Provide a valid email.'),
        body('password').trim().notEmpty().withMessage('A password must be provided.'),
    ],
    validateRequest,
    (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate('local', (err: Error | null, user: any, info: any) => {
            if (err) {
                return res.status(500).send({ error: 'Internal server error.' });
            }

            if (!user) {
                return res.status(400).send({ error: 'Invalid credentials.' });
            }

            const token = generateToken(user.id, user.email);
            res.status(200).send({ user, token }); // Include token in response
        })(req, res, next);
    }
);

export { router as signInRouter };
