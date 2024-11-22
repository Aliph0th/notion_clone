import { Router } from 'express';
import { authMiddleware } from '../middlewares';
import authRouter from './auth.router';
import notesRouter from './notes.router';
import usersRouter from './users.router';

const router = Router();

router.use('/auth', authRouter);
router.use('/users', authMiddleware, usersRouter);
router.use('/notes', authMiddleware, notesRouter);

export default router;
