import { Router } from 'express';
import authRouter from './auth.router';
import userRouter from './user.router';
import { authMiddleware } from '../middlewares';

const router = Router();

router.use('/auth', authRouter);
router.use('/users', authMiddleware, userRouter);

export default router;
