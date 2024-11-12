import { ValidationError } from 'express-validator';

export class ApiException extends Error {
   readonly status: number;
   readonly errors: ValidationError[];
   constructor(status: number, message: string, errors: ValidationError[] = []) {
      super(message);
      this.status = status;
      this.errors = errors;
   }
}

export class BadRequestException extends ApiException {
   constructor(message: string, errors: ValidationError[] = []) {
      super(400, message, errors);
   }
}
