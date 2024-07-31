import { Request, Response, NextFunction } from 'express';

class CustomError extends Error {
    statusCode!: number;  // Definite assignment assertion

    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, CustomError.prototype);
    }

    serializeErrors() {
        return [{ message: this.message }];
    }
}

export class NotFoundError extends CustomError {
    statusCode = 404;

    constructor() {
        super('Route not found');
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof CustomError) {
        return res.status(err.statusCode).send({ errors: err.serializeErrors() });
    }

    res.status(500).send({
        errors: [{ message: 'Something went wrong' }],
    });
};
