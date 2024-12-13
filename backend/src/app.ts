import express from 'express';
import 'express-async-errors';

import { cors, globalErrorHandler } from './_common/middlewares/index.js';
import userRoutes from './routes/user.routes.js';
import postRoutes from './routes/post.routes.js';

const app = express();

app.use(express.json({ limit: '5mb' }));
app.use(cors);

app.use('/user', userRoutes);
app.use('/post', postRoutes);
app.use(globalErrorHandler);

export default app;
