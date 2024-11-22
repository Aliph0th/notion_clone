import { inject, injectable } from 'inversify';
import { INoteController, INoteService } from '../interfaces';
import { Request, Response, NextFunction } from 'express';
import { IOC_TYPES } from '../IoC/types';
import { plainToInstance } from 'class-transformer';
import { CreatePatchNoteDTO } from './note.dto';

@injectable()
export class NoteController implements INoteController {
   private readonly noteService: INoteService;
   constructor(@inject(IOC_TYPES.NoteService) noteService: INoteService) {
      this.noteService = noteService;
   }
   create = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const noteDTO = plainToInstance(CreatePatchNoteDTO, req.body as unknown);
         const createdNote = await this.noteService.create({
            user: { connect: { id: req.userID! } },
            name: noteDTO.name!,
            content: noteDTO.content!
         });
         res.status(201).json(createdNote);
      } catch (error) {
         next(error);
      }
   };

   get = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const note = await this.noteService.getByID(req.userID!, +req.params['noteID']);
         res.status(200).json(note);
      } catch (error) {
         next(error);
      }
   };

   getAll = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const notes = await this.noteService.getAll(req.userID!);
         res.status(200).json(notes);
      } catch (error) {
         next(error);
      }
   };

   patch = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const patchNoteDTO = plainToInstance(CreatePatchNoteDTO, req.body as unknown, { exposeUnsetFields: false });
         const note = await this.noteService.patch(req.userID!, +req.params['noteID'], patchNoteDTO);
         res.status(200).json(note);
      } catch (error) {
         next(error);
      }
   };

   delete = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const deletedNote = await this.noteService.delete(req.userID!, +req.params['noteID']);
         res.status(200).json(deletedNote);
      } catch (error) {
         next(error);
      }
   };
}
