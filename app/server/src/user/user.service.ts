import { injectable } from 'inversify';
import { IUserService } from '../interfaces';
import { Prisma, PrismaClient, User } from '@prisma/client';

@injectable()
export class UserService implements IUserService {
   private readonly client = new PrismaClient();
   constructor() {
      this.client.$connect();
   }
   findOne = async (where: Partial<User>) => {
      return await this.client.user.findFirst({ where });
   };

   create = async (data: Prisma.UserCreateInput) => {
      return await this.client.user.create({ data });
   };
}
