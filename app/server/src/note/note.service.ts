import { Prisma, PrismaClient } from '@prisma/client';
import { injectable } from 'inversify';
import { BadRequestException, ForbiddenException, NotFoundException } from '../exceptions';
import { INoteService } from '../interfaces';
import { CreatePatchNoteDTO } from './note.dto';

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

   getAll = async (userID: number) => {
      const notes = await this.client.note.findMany({ where: { userID } });
      if (!notes) {
         throw new NotFoundException();
      }

      return notes;
   };

   patch = async (userID: number, noteID: number, update: CreatePatchNoteDTO) => {
      if (!noteID) {
         throw new BadRequestException({ message: 'Invalid note id' });
      }
      const candidate = await this.client.note.findFirst({ where: { id: noteID }, select: { userID: true } });
      if (!candidate) {
         throw new NotFoundException();
      }
      if (candidate.userID !== userID) {
         throw new ForbiddenException();
      }
      return await this.client.note.update({ where: { id: noteID, userID }, data: update });
   };
}
