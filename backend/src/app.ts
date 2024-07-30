import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { errorHandler, NotFoundError } from 'base-error-handler';
import morganLogger from './config/logger/HTTP-request-logger';
import generateSwaggerDocs from './config/API Documentation/swagger';
import APIs from './routes';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(morganLogger());
app.set('trust proxy', true);

const corsOptions = {
    origin: process.env.FRONTEND_URL,
    credentials: true,
};
app.use(cors(corsOptions));

app.use(json());
app.use(cookieParser());

generateSwaggerDocs(app, PORT as number);

app.use('/api/v1', APIs);

app.all('*', () => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };
