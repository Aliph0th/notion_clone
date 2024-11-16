import { inject, injectable } from 'inversify';
import { INoteController, INoteService } from '../interfaces';
import { Request, Response, NextFunction } from 'express';
import { IOC_TYPES } from '../IoC/types';
import { plainToInstance } from 'class-transformer';
import { CreateNoteDTO } from './note.dto';

@injectable()
export class NoteController implements INoteController {
   private readonly noteService: INoteService;
   constructor(@inject(IOC_TYPES.NoteService) noteService: INoteService) {
      this.noteService = noteService;
   }
   create = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const noteDTO = plainToInstance(CreateNoteDTO, req.body as unknown);
         const createdNote = await this.noteService.create({
            user: { connect: { id: req.userID! } },
            name: noteDTO.name,
            content: noteDTO.content
         });
         res.status(201).json(createdNote);
      } catch (error) {
         next(error);
      }
   };
}
