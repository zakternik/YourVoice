import { Router } from 'express';
import {
  addComment,
  createPost,
  deletePost,
  getPostById,
  getPostList,
  removeComment,
  updatePost,
} from './post.controller.js';
import { isAuthGuard } from '../_common/middlewares/index.js';

const router = Router();

router.get('/', getPostList);
router.get('/:id', getPostById);

router.post('/', [isAuthGuard], createPost);
router.put('/:id', [isAuthGuard], updatePost);

router.delete('/:id', [isAuthGuard], deletePost);

router.post('/:id/comment', addComment);
router.delete('/:id/comment/:commentId', removeComment);

export default router;
