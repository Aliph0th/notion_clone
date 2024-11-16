import { Router } from 'express';
import IOC_CONTAINER from '../IoC';
import { IOC_TYPES } from '../IoC/types';
import { IUserController } from '../interfaces';
import { patchUserValidators } from './validators';
import { validationResultMiddleware } from '../middlewares';

const usersRouter = Router();
const userController = IOC_CONTAINER.get<IUserController>(IOC_TYPES.UserController);

usersRouter.get('/myself', userController.getMyself);
usersRouter.patch('/:userID', ...patchUserValidators, validationResultMiddleware, userController.patch);

export default usersRouter;
