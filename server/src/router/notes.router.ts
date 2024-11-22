import { Router } from 'express';
import IOC_CONTAINER from '../IoC';
import { IOC_TYPES } from '../IoC/types';
import { INoteController } from '../interfaces';
import { IDValidator, noteCreateValidators, notePatchValidators } from './validators';

const notesRouter = Router();
const noteController = IOC_CONTAINER.get<INoteController>(IOC_TYPES.NoteController);

const noteIDValidator = IDValidator('noteID');
const userIDValidator = IDValidator('userID');

notesRouter.post('/', ...noteCreateValidators, noteController.create);
notesRouter.get('/:userID', userIDValidator, noteController.getAllForUser);
notesRouter.get('/:userID/:noteID', userIDValidator, noteIDValidator, noteController.getForUser);
notesRouter.patch('/:noteID', noteIDValidator, ...notePatchValidators, noteController.patch);
notesRouter.delete('/:noteID', noteIDValidator, noteController.delete);

export default notesRouter;
