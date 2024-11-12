import express from 'express';
import cors from 'cors';
import router from './router';
import cookieParser from 'cookie-parser';
import { errorMiddleware } from './middlewares';

const app = express();

app.use(express.json());
app.use(cors({ credentials: true }));
app.use(cookieParser());
app.use(router);
app.use(errorMiddleware);

const PORT = +(process.env.PORT || 3000);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
