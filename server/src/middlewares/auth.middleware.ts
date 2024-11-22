import { NextFunction, Request, Response } from 'express';
import IOC_CONTAINER from '../IoC';
import { IOC_TYPES } from '../IoC/types';
import { UnauthorizedException } from '../exceptions';
import { ITokenService } from '../interfaces';

const tokenService = IOC_CONTAINER.get<ITokenService>(IOC_TYPES.TokenService);

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
   try {
      const authorizationHeader = req.headers.authorization;
      if (!authorizationHeader) {
         next(new UnauthorizedException());
         return;
      }

      const accessToken = authorizationHeader.split(' ')[1];
      if (!accessToken) {
         next(new UnauthorizedException());
         return;
      }

      const userID = tokenService.validateAccessToken(accessToken);
      if (!userID) {
         next(new UnauthorizedException());
         return;
      }

      req.userID = +userID.id;
      next();
   } catch (_) {
      next(new UnauthorizedException());
      return;
   }
};
