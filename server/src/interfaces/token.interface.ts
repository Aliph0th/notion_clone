import { Prisma, Token } from '@prisma/client';
import { JwtPayload } from 'jsonwebtoken';

export interface ITokens {
   accessToken: string;
   refreshToken: string;
}
export interface ITokenService {
   generateTokens: (payload: string | Buffer | object) => ITokens;
   validateAccessToken: (token: string) => JwtPayload | null;
   validateRefreshToken: (token: string) => JwtPayload | null;
   upsert: (userID: number, token: string) => Promise<{ token: string }>;
   findOne: (where: Prisma.TokenWhereInput) => Promise<Token | null>;
   deleteOne: (where: Prisma.TokenWhereUniqueInput) => Promise<Token | null>;
}
