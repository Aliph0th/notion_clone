import { injectable } from 'inversify';
import { IUserService } from '../interfaces';
import { Prisma, PrismaClient, User } from '@prisma/client';
import { PatchUserDTO, ResponseUserDTO, UpdatePasswordDTO } from './user.dto';
import { NotFoundException, ForbiddenException, BadRequestException } from '../exceptions';
import { plainToInstance } from 'class-transformer';
import bcrypt from 'bcrypt';
import { SALT_ROUNDS } from '../constants';

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

   patch = async (userID: number, paramsUserID: number, update: PatchUserDTO) => {
      if (paramsUserID !== userID) {
         throw new ForbiddenException();
      }
      const candidate = await this.client.user.findFirst({ where: { id: userID }, select: { id: true } });
      if (!candidate) {
         throw new NotFoundException();
      }
      const user = await this.client.user.update({ where: { id: userID }, data: update });
      return plainToInstance(ResponseUserDTO, user);
   };

   updatePassword = async (userID: number, paramsUserID: number, dto: UpdatePasswordDTO) => {
      if (paramsUserID !== userID) {
         throw new ForbiddenException();
      }
      const candidate = await this.client.user.findFirst({ where: { id: userID }, select: { password: true } });
      if (!candidate) {
         throw new NotFoundException();
      }
      const isPasswordsMatch = await bcrypt.compare(dto.currentPassword, candidate.password);
      if (!isPasswordsMatch) {
         throw new BadRequestException({ message: "Current password doesn't match" });
      }
      const hashedPassword = await bcrypt.hash(dto.password, SALT_ROUNDS);
      await this.client.user.update({ where: { id: userID }, data: { password: hashedPassword } });
   };
}
