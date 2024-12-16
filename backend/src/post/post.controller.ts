import type { Request, Response } from 'express';
import { HttpStatusCode } from '../_common/utils/index.js';
import {
  addCommentToPost,
  createUserPost,
  deleteUserPost,
  findPostById,
  postsList,
  removeCommentFromPost,
  updateUserPost,
} from './repositories/post.repository.js';

export const getPostList = async (req: Request, res: Response) => {
  const posts = await postsList();
  res.status(HttpStatusCode.OK).json({
    posts: posts,
  });
};

export const getPostById = async (req: Request, res: Response) => {
  const id = req.params.id ?? '';
  const post = await findPostById(id);

  res.status(HttpStatusCode.OK).json({
    post: post,
  });
};

export const createPost = async (req: Request, res: Response) => {
  const title = req.body.title;
  const content = req.body.title;
  const category = req.body.title;

  const post = await createUserPost({
    title: title,
    content: content,
    category: category,
    userId: req.user!.id,
  });

  res.status(HttpStatusCode.CREATED).json({
    post: post,
  });
};

export const updatePost = async (req: Request, res: Response) => {
  const title = req.body.title;
  const content = req.body.title;
  const category = req.body.title;

  const post = await updateUserPost({
    title: title,
    content: content,
    category: category,
    userId: req.user!.id,
  });

  res.status(HttpStatusCode.OK).json({
    post: post,
  });
};

export const deletePost = async (req: Request, res: Response) => {
  const id = req.params.id ?? '';

  const deleteResult = await deleteUserPost({
    userId: req.user!.id,
    postId: id,
  });

  res.status(HttpStatusCode.OK).json({
    result: deleteResult,
  });
};

export const addComment = async (req: Request, res: Response) => {
  const postId = req.params.id ?? '';
  const content = req.body.content;

  const post = await addCommentToPost({
    postId: postId,
    userId: req.user!.id,
    content: content,
  });

  res.status(HttpStatusCode.OK).json({
    post: post,
  });
};

export const removeComment = async (req: Request, res: Response) => {
  const postId = req.params.id ?? '';
  const commentId = req.params.commentid ?? '';

  const post = await removeCommentFromPost({
    postId: postId,
    commentId: commentId,
    userId: req.user!.id,
  });

  res.status(HttpStatusCode.OK).json({
    post: post,
  });
};
