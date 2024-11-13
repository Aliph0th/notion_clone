import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { IConfigService, ITokenService } from '../interfaces';
import { IOC_TYPES } from '../IoC/types';
import jwt from 'jsonwebtoken';
import { TOKENS } from '../constants';

@injectable()
export class TokenService implements ITokenService {
   private readonly configService: IConfigService;
   constructor(@inject(IOC_TYPES.ConfigService) configService: IConfigService) {
      this.configService = configService;
   }

   generateTokens = (payload: string | Buffer | object) => {
      const accessToken = jwt.sign(payload, this.configService.getOrThrow('ACCESS_SECRET'), {
         expiresIn: TOKENS.ACCESS_EXPIRATION
      });
      const refreshToken = jwt.sign(payload, this.configService.getOrThrow('REFRESH_SECRET'), {
         expiresIn: TOKENS.REFRESH_EXPIRATION
      });

      return { accessToken, refreshToken };
   };

   validateAccessToken(token: string) {
      try {
         return jwt.verify(token, this.configService.getOrThrow('ACCESS_SECRET'));
      } catch (_) {
         return null;
      }
   }

   validateRefreshToken(token: string) {
      try {
         return jwt.verify(token, this.configService.getOrThrow('REFRESH_SECRET'));
      } catch (_) {
         return null;
      }
   }
}
