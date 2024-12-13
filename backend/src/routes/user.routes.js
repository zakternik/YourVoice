import { Router } from 'express';

import UserController from '../controllers/UserController.js';

const router = Router();

router.get('/', UserController.list);
router.get('/:id', UserController.show);
router.post('/', UserController.create);

router.post('/login', UserController.login);
router.put('/:id', UserController.update);
router.delete('/:id', UserController.remove);

export default router;
