import { Router } from 'express';
import IOC_CONTAINER from '../IoC';
import { IOC_TYPES } from '../IoC/types';
import { IAuthController } from '../interfaces';
import { authLoginValidators, authRegisterValidators } from './validators';
import { validationResultMiddleware } from '../middlewares';

const authRouter = Router();
const authController = IOC_CONTAINER.get<IAuthController>(IOC_TYPES.AuthController);

authRouter.post('/register', ...authRegisterValidators, validationResultMiddleware, authController.register);
authRouter.post('/login', ...authLoginValidators, validationResultMiddleware, authController.login);
authRouter.post('/refresh', authController.refresh);
authRouter.post('/logout', authController.logout);

export default authRouter;
