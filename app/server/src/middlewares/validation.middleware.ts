import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { BadRequestException } from '../exceptions';

export const validationResultMiddleware = (req: Request, res: Response, next: NextFunction) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      next(new BadRequestException({ errors: errors.array() }));
      return;
   }
   next();
};
