import { Prisma, PrismaClient } from '@prisma/client';
import { injectable } from 'inversify';
import { INoteService } from '../interfaces';
import { BadRequestException, ForbiddenException, NotFoundException } from '../exceptions';

@injectable()
export class NoteService implements INoteService {
   private readonly client = new PrismaClient();
   constructor() {
      this.client.$connect();
   }
   create = async (data: Prisma.NoteCreateInput) => {
      return await this.client.note.create({ data });
   };

   getByID = async (userID: number, noteID: number) => {
      if (!noteID) {
         throw new BadRequestException({ message: 'Invalid note id' });
      }
      const note = await this.client.note.findFirst({ where: { id: noteID } });
      if (!note) {
         throw new NotFoundException();
      }
      if (note.userID !== userID) {
         throw new ForbiddenException();
      }

      return note;
   };
}
