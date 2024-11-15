import { Token } from '@prisma/client';
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
   findOne: (where: Partial<Token>) => Promise<Token | null>;
   deleteOne: (id: number) => Promise<Token | null>;
}
