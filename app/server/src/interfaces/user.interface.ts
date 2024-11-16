import { Prisma, User } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { PatchUserDTO, ResponseUserDTO } from '../user/user.dto';

export interface IUserController {
   getMyself: (req: Request, res: Response, next: NextFunction) => void;
   patch: (req: Request, res: Response, next: NextFunction) => void;
}

export interface IUserService {
   findOne: (where: Partial<User>) => Promise<User | null>;
   create: (user: Prisma.UserCreateInput) => Promise<User>;
   patch: (userID: number, paramsUserID: number, update: PatchUserDTO) => Promise<ResponseUserDTO>;
}
