import { NextFunction, Request, Response } from 'express';
import { RegisterDTO } from '../auth/auth.dto';
import { ITokens } from './token.interface';
import { ResponseUserDTO } from '../user/user.dto';
export interface IAUthController {
   register: (req: Request, res: Response, next: NextFunction) => void;
}

export interface IAuthService {
   register: (dto: RegisterDTO) => Promise<{ tokens: ITokens; user: ResponseUserDTO }>;
}
