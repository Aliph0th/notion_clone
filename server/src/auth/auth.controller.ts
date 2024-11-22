import { plainToInstance } from 'class-transformer';
import { NextFunction, Request, Response } from 'express';
import { inject } from 'inversify';
import 'reflect-metadata';
import { IAuthController, IAuthService } from '../interfaces';
import { IOC_TYPES } from '../IoC/types';
import { LoginDTO, RegisterDTO } from './auth.dto';
import { TOKENS } from '../constants';

export class AuthController implements IAuthController {
   private readonly authService: IAuthService;
   constructor(@inject(IOC_TYPES.AuthService) authService: IAuthService) {
      this.authService = authService;
   }

   register = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const userDTO = plainToInstance(RegisterDTO, req.body as unknown, {
            excludeExtraneousValues: true,
            exposeUnsetFields: false
         });
         const { tokens, user } = await this.authService.register(userDTO);
         res.cookie('refreshToken', tokens.refreshToken, { maxAge: TOKENS.REFRESH_EXPIRATION * 1000, httpOnly: true });
         res.status(201).json({ user, accessToken: tokens.accessToken });
      } catch (error) {
         next(error);
      }
   };

   login = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const userDTO = plainToInstance(LoginDTO, req.body as unknown);
         const { tokens, user } = await this.authService.login(userDTO);
         res.cookie('refreshToken', tokens.refreshToken, { maxAge: TOKENS.REFRESH_EXPIRATION * 1000, httpOnly: true });
         res.status(200).json({ user, accessToken: tokens.accessToken });
      } catch (error) {
         next(error);
      }
   };

   refresh = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const { tokens } = await this.authService.refresh(req.cookies['refreshToken']);
         res.cookie('refreshToken', tokens.refreshToken, { maxAge: TOKENS.REFRESH_EXPIRATION * 1000, httpOnly: true });
         res.status(200).json({ accessToken: tokens.accessToken });
      } catch (error) {
         next(error);
      }
   };

   logout = async (req: Request, res: Response, next: NextFunction) => {
      try {
         await this.authService.logout(req.cookies['refreshToken']);
         res.clearCookie('refreshToken');
         res.sendStatus(200);
      } catch (error) {
         next(error);
      }
   };
}
