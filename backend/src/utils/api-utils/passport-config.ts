import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import {User} from '../../models/user';
import {Password} from '../../utils/api-utils/password';

passport.use(
    new LocalStrategy(
        {usernameField: 'email', passwordField: 'password'},
        async (email: string, password: string, done: (error: any, user?: any, options?: {
            message: string
        }) => void) => {
            try {
                const existingUser = await User.findOne({email});

                if (!existingUser) {
                    return done(null, false, {message: 'Invalid credentials.'});
                }

                const passwordMatch = await Password.compare(existingUser.password, password);
                if (!passwordMatch) {
                    return done(null, false, {message: 'Invalid credentials.'});
                }

                return done(null, existingUser);
            } catch (err) {
                return done(err);
            }
        }
    )
);

// Serialize user to store user id in session
passport.serializeUser((user: any, done: (err: any, id?: string) => void) => {
    done(null, user.id);
});

// Deserialize user by retrieving user id from session
passport.deserializeUser(async (id: string, done: (err: any, user?: any) => void) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

export default passport;
