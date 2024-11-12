import { Router } from 'express';
import IOC_CONTAINER from '../IoC';
import { IOC_TYPES } from '../IoC/types';
import { IAUthController } from '../interfaces';
import { authRegisterValidators } from './validators';
import { validationResultMiddleware } from '../middlewares';

const authRouter = Router();
const authController = IOC_CONTAINER.get<IAUthController>(IOC_TYPES.AuthController);

authRouter.post('/register', ...authRegisterValidators, validationResultMiddleware, authController.register);

export default authRouter;
