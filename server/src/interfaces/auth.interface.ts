import { NextFunction, Request, Response } from 'express';
import { LoginDTO, RegisterDTO } from '../auth/auth.dto';
import { ITokens } from './token.interface';
import { ResponseUserDTO } from '../user/user.dto';
export interface IAuthController {
   register: (req: Request, res: Response, next: NextFunction) => void;
   login: (req: Request, res: Response, next: NextFunction) => void;
   refresh: (req: Request, res: Response, next: NextFunction) => void;
   logout: (req: Request, res: Response, next: NextFunction) => void;
}

export interface IAuthService {
   register: (dto: RegisterDTO) => Promise<{ tokens: ITokens; user: ResponseUserDTO }>;
   login: (dto: LoginDTO) => Promise<{ tokens: ITokens; user: ResponseUserDTO }>;
   refresh: (token: string) => Promise<{ tokens: ITokens }>;
   logout: (token: string) => Promise<void>;
}
