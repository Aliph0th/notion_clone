import { param } from 'express-validator';

export * from './auth.validators';
export * from './note.validators';
export * from './user.validators';

export const IDValidator = (paramName: string) =>
   param(paramName)
      .isInt({ allow_leading_zeroes: false, gt: 0 })
      .bail({ level: 'request' })
      .withMessage('ID parameter must be an integer greater than 0');
