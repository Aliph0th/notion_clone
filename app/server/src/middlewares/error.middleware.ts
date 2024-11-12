import { ApiException } from '../exceptions';
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorMiddleware: ErrorRequestHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
   if (error instanceof ApiException) {
      res.status(error.status).json({ message: error.message, errors: error.errors });
      return;
   }
   res.status(500).json({ message: 'Something bad happened...' });
};
