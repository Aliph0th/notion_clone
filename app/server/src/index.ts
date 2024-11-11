import express from 'express';
import cors from 'cors';
import router from './router';

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

const PORT = +(process.env.PORT || 3000);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
