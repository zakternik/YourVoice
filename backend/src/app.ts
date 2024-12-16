import express from 'express';
import 'express-async-errors';

import { cors, globalErrorHandler } from './_common/middlewares/index.js';
import postRoutes from './post/post.routes.js';
import userRoutes from './user/user.routes.js';
import authRoutes from './auth/auth.routes.js';

const app = express();

app.use(express.json({ limit: '5mb' }));
app.use(cors);

app.use('/api/post', postRoutes);
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use(globalErrorHandler);

export default app;
