import { Router } from 'express';
import {
  createPost,
  deletePost,
  getPostById,
  getPostList,
  updatePost,
} from './post.controller.js';

const router = Router();

router.get('/', getPostList);
router.get('/:id', getPostById);

router.post('/', createPost);
router.put('/:id', updatePost);

router.delete('/:id', deletePost);

// router.post('/:id/comment', PostController.addComment);
// router.delete('/:id/comment/:commentId', PostController.removeComment);

export default router;
