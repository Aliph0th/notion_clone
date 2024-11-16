import { Prisma, PrismaClient } from '@prisma/client';
import { injectable } from 'inversify';
import { INoteService } from '../interfaces';

@injectable()
export class NoteService implements INoteService {
   private readonly client = new PrismaClient();
   constructor() {
      this.client.$connect();
   }
   create = async (data: Prisma.NoteCreateInput) => {
      return await this.client.note.create({ data });
   };
}
