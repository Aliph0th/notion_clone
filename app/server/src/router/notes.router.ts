import { Router } from 'express';
import IOC_CONTAINER from '../IoC';
import { IOC_TYPES } from '../IoC/types';
import { INoteController } from '../interfaces';
import { noteCreateValidators, notePatchValidators } from './validators';
import { validationResultMiddleware } from '../middlewares';

const notesRouter = Router();
const noteController = IOC_CONTAINER.get<INoteController>(IOC_TYPES.NoteController);

notesRouter.post('/', ...noteCreateValidators, validationResultMiddleware, noteController.create);
notesRouter.get('/:noteID', noteController.get);
notesRouter.get('/', noteController.getAll);
notesRouter.patch('/:noteID', ...notePatchValidators, validationResultMiddleware, noteController.patch);
notesRouter.delete('/:noteID', noteController.delete);

export default notesRouter;
