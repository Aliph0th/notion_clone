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
   constructor({ message = 'Bad request', errors = [] }: { message?: string; errors?: ValidationError[] }) {
      super(400, message, errors);
   }
}

export class ConflictException extends ApiException {
   constructor(message = 'Conflict') {
      super(409, message);
   }
}

export class UnauthorizedException extends ApiException {
   constructor(message = 'Unauthorized') {
      super(401, message);
   }
}
