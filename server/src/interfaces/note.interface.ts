import { NextFunction, Request, Response } from 'express';
import { CreatePatchNoteDTO } from '../note/note.dto';
import { Note, Prisma } from '@prisma/client';

export interface INoteController {
   create: (req: Request, res: Response, next: NextFunction) => void;
   getForUser: (req: Request, res: Response, next: NextFunction) => void;
   getAllForUser: (req: Request, res: Response, next: NextFunction) => void;
   patch: (req: Request, res: Response, next: NextFunction) => void;
   delete: (req: Request, res: Response, next: NextFunction) => void;
}

export interface INoteService {
   create: (data: Prisma.NoteCreateInput) => Promise<Note>;
   getByID: (userID: number, noteID: number) => Promise<Note>;
   getAll: (userID: number) => Promise<Note[]>;
   patch: (userID: number, noteID: number, update: CreatePatchNoteDTO) => Promise<Note>;
   delete: (userID: number, noteID: number) => Promise<Note>;
}
