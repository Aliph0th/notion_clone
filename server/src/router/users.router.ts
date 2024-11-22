import { Router } from 'express';
import IOC_CONTAINER from '../IoC';
import { IOC_TYPES } from '../IoC/types';
import { IUserController } from '../interfaces';
import { IDValidator, patchUserValidators, updatePasswordValidators } from './validators';

const usersRouter = Router();
const userController = IOC_CONTAINER.get<IUserController>(IOC_TYPES.UserController);

const idValidator = IDValidator('userID');

usersRouter.get('/myself', userController.getMyself);
usersRouter.patch('/:userID', idValidator, ...patchUserValidators, userController.patch);
usersRouter.patch('/:userID/password', idValidator, ...updatePasswordValidators, userController.updatePassword);

export default usersRouter;
