import { NextFunction, Request, Response } from 'express';
import { CreateNoteDTO } from '../note/note.dto';
import { Note, Prisma } from '@prisma/client';

export interface INoteController {
   create: (req: Request, res: Response, next: NextFunction) => void;
   get: (req: Request, res: Response, next: NextFunction) => void;
}

export interface INoteService {
   create: (data: Prisma.NoteCreateInput) => Promise<Note>;
   getByID: (userID: number, noteID: number) => Promise<Note>;
}
