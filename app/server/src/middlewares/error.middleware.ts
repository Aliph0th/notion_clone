import { ApiException } from '../exceptions';
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

export const errorMiddleware: ErrorRequestHandler = (error: Error, req: Request, res: Response, _: NextFunction) => {
   if (error instanceof ApiException) {
      res.status(error.status).json({ message: error.message, errors: error.errors });
      return;
   }
   console.error(error);
   res.status(500).json({ message: 'Something bad happened...' });
};
