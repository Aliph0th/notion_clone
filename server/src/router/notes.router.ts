import { Router } from 'express';
import IOC_CONTAINER from '../IoC';
import { IOC_TYPES } from '../IoC/types';
import { INoteController } from '../interfaces';
import { IDValidator, noteCreateValidators, notePatchValidators } from './validators';

const notesRouter = Router();
const noteController = IOC_CONTAINER.get<INoteController>(IOC_TYPES.NoteController);

const idValidator = IDValidator('noteID');

notesRouter.post('/', ...noteCreateValidators, noteController.create);
notesRouter.get('/:noteID', idValidator, noteController.get);
notesRouter.get('/', noteController.getAll);
notesRouter.patch('/:noteID', idValidator, ...notePatchValidators, noteController.patch);
notesRouter.delete('/:noteID', idValidator, noteController.delete);

export default notesRouter;
