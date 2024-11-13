import { Prisma, User } from '@prisma/client';

export interface IUserService {
   findOne: (where: Partial<User>) => Promise<User | null>;
   create: (user: Prisma.UserCreateInput) => Promise<User>;
}
