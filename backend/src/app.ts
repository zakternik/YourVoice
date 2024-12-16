import express from 'express';
import 'express-async-errors';

import { cors, globalErrorHandler } from './_common/middlewares/index.js';
import postRoutes from './post/post.routes.js';

const app = express();

app.use(express.json({ limit: '5mb' }));
app.use(cors);

app.use('/post', postRoutes);
app.use(globalErrorHandler);

export default app;
