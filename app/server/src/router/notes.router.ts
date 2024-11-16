import { Router } from 'express';
import IOC_CONTAINER from '../IoC';
import { IOC_TYPES } from '../IoC/types';
import { INoteController } from '../interfaces';
import { IDValidator, noteCreateValidators, notePatchValidators } from './validators';
import { validationResultMiddleware } from '../middlewares';

const notesRouter = Router();
const noteController = IOC_CONTAINER.get<INoteController>(IOC_TYPES.NoteController);

const idValidator = IDValidator('noteID');

notesRouter.post('/', ...noteCreateValidators, validationResultMiddleware, noteController.create);
notesRouter.get('/:noteID', idValidator, validationResultMiddleware, noteController.get);
notesRouter.get('/', noteController.getAll);
notesRouter.patch('/:noteID', idValidator, ...notePatchValidators, validationResultMiddleware, noteController.patch);
notesRouter.delete('/:noteID', idValidator, validationResultMiddleware, noteController.delete);

export default notesRouter;
