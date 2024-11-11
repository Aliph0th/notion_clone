import { Request, Response } from 'express';
import { inject } from 'inversify';
import 'reflect-metadata';
import { IAUthController, ITokenService } from '../interfaces';
import { IOC_TYPES } from '../IoC/types';
import { validationResult } from 'express-validator';

export class AuthController implements IAUthController {
   private readonly tokenService: ITokenService;
   constructor(@inject(IOC_TYPES.TokenService) _tokenService: ITokenService) {
      this.tokenService = _tokenService;
   }

   register = (req: Request, res: Response) => {
      this.tokenService.generate();
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         res.status(400).json(errors.array());
         return;
      }
      res.status(201).json('ok');
   };
}
