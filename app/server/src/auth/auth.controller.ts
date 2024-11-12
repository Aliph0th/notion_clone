import { NextFunction, Request, Response } from 'express';
import { inject } from 'inversify';
import 'reflect-metadata';
import { IAUthController, ITokenService } from '../interfaces';
import { IOC_TYPES } from '../IoC/types';
import { validationResult } from 'express-validator';
import { BadRequestException } from '../exceptions';

export class AuthController implements IAUthController {
   private readonly tokenService: ITokenService;
   constructor(@inject(IOC_TYPES.TokenService) _tokenService: ITokenService) {
      this.tokenService = _tokenService;
   }

   register = (req: Request, res: Response, next: NextFunction) => {
      try {
         const errors = validationResult(req);
         if (!errors.isEmpty()) {
            throw new BadRequestException(errors.array());
         }
         res.status(201).json('ok');
      } catch (error) {
         next(error);
      }
   };
}
