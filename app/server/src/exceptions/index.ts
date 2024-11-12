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
   constructor(errors: ValidationError[] = []) {
      super(400, 'Bad request', errors);
   }
}

export class ConflictException extends ApiException {
   constructor(message: string) {
      super(409, message);
   }
}
