import { Prisma, PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import jwt, { JwtPayload } from 'jsonwebtoken';
import 'reflect-metadata';
import { TOKENS } from '../constants';
import { IConfigService, ITokenService } from '../interfaces';
import { IOC_TYPES } from '../IoC/types';

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

   upsert = async (userID: number, token: string, oldToken?: string) => {
      return await this.client.token.upsert({
         select: { token: true },
         where: { token: oldToken ? oldToken : token },
         create: { userID, token },
         update: { token }
      });
   };

   findOne = async (where: Prisma.TokenWhereInput) => {
      return await this.client.token.findFirst({ where });
   };

   deleteOne = async (where: Prisma.TokenWhereUniqueInput) => {
      return await this.client.token.delete({ where });
   };
}
