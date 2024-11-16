import { Router } from 'express';
import IOC_CONTAINER from '../IoC';
import { IOC_TYPES } from '../IoC/types';
import { INoteController } from '../interfaces';
import { noteCreateValidators } from './validators';
import { validationResultMiddleware } from '../middlewares';

const notesRouter = Router();
const noteController = IOC_CONTAINER.get<INoteController>(IOC_TYPES.NoteController);

notesRouter.post('/', ...noteCreateValidators, validationResultMiddleware, noteController.create);
notesRouter.get('/:noteID', noteController.get);
export default notesRouter;
