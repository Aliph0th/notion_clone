import { Router } from 'express';
import IOC_CONTAINER from '../IoC';
import { IOC_TYPES } from '../IoC/types';
import { IUserController } from '../interfaces';

const userRouter = Router();
const userController = IOC_CONTAINER.get<IUserController>(IOC_TYPES.UserController);

userRouter.get('/myself', userController.getMyself);

export default userRouter;
