import express from 'express';
import cors from 'cors';
import router from './routes/routes.mjs';
import { checkAuthToken } from './routes/routes.mjs';
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/v1',router);
app.use(checkAuthToken);


export default app;