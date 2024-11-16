import { Router } from 'express';
import IOC_CONTAINER from '../IoC';
import { IOC_TYPES } from '../IoC/types';
import { IUserController } from '../interfaces';

const usersRouter = Router();
const userController = IOC_CONTAINER.get<IUserController>(IOC_TYPES.UserController);

usersRouter.get('/myself', userController.getMyself);

export default usersRouter;
