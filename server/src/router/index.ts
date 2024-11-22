import { Router } from 'express';
import authRouter from './auth.router';
import usersRouter from './users.router';
import { authMiddleware, validationResultMiddleware } from '../middlewares';
import notesRouter from './notes.router';

const router = Router();

router.use(validationResultMiddleware);

router.use('/auth', authRouter);
router.use('/users', authMiddleware, usersRouter);
router.use('/notes', authMiddleware, notesRouter);

export default router;
