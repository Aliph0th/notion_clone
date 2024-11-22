import { Router } from 'express';
import IOC_CONTAINER from '../IoC';
import { IOC_TYPES } from '../IoC/types';
import { INoteController } from '../interfaces';
import { IDValidator, noteCreateValidators, notePatchValidators } from './validators';
import { validationResultMiddleware } from '../middlewares';

const notesRouter = Router();
const noteController = IOC_CONTAINER.get<INoteController>(IOC_TYPES.NoteController);

const noteIDValidator = IDValidator('noteID');
const userIDValidator = IDValidator('userID');

notesRouter.post('/', ...noteCreateValidators, validationResultMiddleware, noteController.create);
notesRouter.get('/:userID', userIDValidator, validationResultMiddleware, noteController.getAllForUser);
notesRouter.get(
   '/:userID/:noteID',
   userIDValidator,
   noteIDValidator,
   validationResultMiddleware,
   noteController.getForUser
);
notesRouter.patch(
   '/:noteID',
   noteIDValidator,
   ...notePatchValidators,
   validationResultMiddleware,
   noteController.patch
);
notesRouter.delete('/:noteID', noteIDValidator, validationResultMiddleware, noteController.delete);

export default notesRouter;
