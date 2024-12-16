import { Router } from 'express';
import { isAuthGuard } from '../_common/middlewares/index.js';
import { getUserInfo } from './user.controller.js';

const router = Router();

router.get('/', [isAuthGuard], getUserInfo);

export default router;
