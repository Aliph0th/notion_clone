import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { IConfigService, ITokenService } from '../interfaces';
import { IOC_TYPES } from '../IoC/types';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { TOKENS } from '../constants';
import { PrismaClient, Token } from '@prisma/client';

@injectable()
export class TokenService implements ITokenService {
   private readonly configService: IConfigService;
   private readonly client = new PrismaClient();
   constructor(@inject(IOC_TYPES.ConfigService) configService: IConfigService) {
      this.client.$connect();
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

   validateAccessToken = (token: string) => {
      try {
         return jwt.verify(token, this.configService.getOrThrow('ACCESS_SECRET')) as JwtPayload;
      } catch (_) {
         return null;
      }
   };

   validateRefreshToken = (token: string) => {
      try {
         return jwt.verify(token, this.configService.getOrThrow('REFRESH_SECRET')) as JwtPayload;
      } catch (_) {
         return null;
      }
   };

   upsert = async (userID: number, token: string) => {
      return await this.client.token.upsert({
         select: { token: true },
         where: { userID_token: { userID, token } },
         create: { userID, token },
         update: { userID, token }
      });
   };

   findOne = async (where: Partial<Token>) => {
      return await this.client.token.findFirst({ where });
   };

   deleteOne = async (id: number) => {
      return await this.client.token.delete({ where: { id } });
   };
}
