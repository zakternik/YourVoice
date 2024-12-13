import { Router } from 'express';

import PostController from '../controllers/PostController.js';

const router = Router();

router.get('/', PostController.list);

router.get('/:id', PostController.show);

router.post('/', PostController.create);

router.put('/:id', PostController.update);

router.delete('/:id', PostController.remove);

router.post('/:id/comment', PostController.addComment);
router.delete('/:id/comment/:commentId', PostController.removeComment);

export default router;
