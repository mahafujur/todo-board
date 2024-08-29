import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import generateSwaggerDocs from './config/API Documentation/swagger';
import APIs from './routes';
import { errorHandler, NotFoundError } from './middleware/error-handler';
import passport from './utils/api-utils/passport-config'; // Adjusted to your actual path
import session from 'express-session';
import morganLogger from "./config/logger/HTTP-request-logger"; // Import express-session for session management

const PORT = process.env.PORT || 3000;
const app = express();

app.use(morganLogger());
app.set('trust proxy', true);

// Updated CORS configuration
const corsOptions = {
    origin: process.env.FRONTEND_URL, // Replace with your frontend URL
    credentials: true,  // Allow credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions));

app.use(json());
app.use(cookieParser());

// Initialize session middleware
app.use(
    session({
        secret: process.env.SESSION_SECRET || 'session_secret', // Use environment variable or default secret key
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: process.env.NODE_ENV === 'production', // Secure cookies in production
            httpOnly: true,
            sameSite: 'none',  // SameSite set to 'none' for cross-origin
        },
    })
);

// Initialize Passport.js middleware
app.use(passport.initialize());
app.use(passport.session());

generateSwaggerDocs(app, PORT as number);

// Set up routes
app.use('/api/v1', APIs);

// Handle unknown routes
app.all('*', () => {
    throw new NotFoundError();
});

// Error handling middleware
app.use(errorHandler);

export { app };
