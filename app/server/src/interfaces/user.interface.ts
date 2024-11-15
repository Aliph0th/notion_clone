import { Prisma, User } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';

export interface IUserController {
   getMyself: (req: Request, res: Response, next: NextFunction) => void;
}

export interface IUserService {
   findOne: (where: Partial<User>) => Promise<User | null>;
   create: (user: Prisma.UserCreateInput) => Promise<User>;
}
