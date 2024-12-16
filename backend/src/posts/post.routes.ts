import { Router } from 'express';
import { getPostById, getPostList } from './post.controller.js';

const router = Router();

router.get('/', getPostList);

router.get('/:id', getPostById);

// router.post('/', PostController.create);
// router.put('/:id', PostController.update);
// router.delete('/:id', PostController.remove);
// router.post('/:id/comment', PostController.addComment);
// router.delete('/:id/comment/:commentId', PostController.removeComment);

export default router;
