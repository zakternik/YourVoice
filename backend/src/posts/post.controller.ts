import type { Request, Response } from 'express';
import { PostEntity } from '../_common/entities/index.js';
import { HttpStatusCode } from '../_common/utils/index.js';
import {
  createUserPost,
  deleteUserPost,
  postsList,
  updateUserPost,
} from './post.repository.js';

export const getPostList = async (req: Request, res: Response) => {
  const posts = await postsList();
  res.status(HttpStatusCode.OK).json({
    posts: posts,
  });
};

export const getPostById = async (req: Request, res: Response) => {
  const id = req.params.id;
  const post = await PostEntity.findById(id)
    .populate('user')
    .populate('comments');
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
  const id = req.body.id;

  const deleteResult = await deleteUserPost({
    userId: req.user!.id,
    postId: id,
  });

  res.status(HttpStatusCode.OK).json({
    result: deleteResult,
  });
};

//   addComment: async function (req, res) {
//     const postId = req.params.id;
//
//     // Preveri, ali so potrebni podatki prisotni
//     if (!req.body.content || !req.body.userId) {
//       return res.status(400).json({
//         message: 'Content and userId are required',
//       });
//     }
//
//     try {
//       const newComment = new CommentModel({
//         content: req.body.content,
//         userId: req.body.userId,
//       });
//
//       const comment = await newComment.save();
//       console.log('Saved Comment:', comment);
//
//       // Dodaj komentar v objavo
//       const post = await PostModel.findByIdAndUpdate(
//         postId,
//         { $push: { comments: comment._id } },
//         { new: true },
//       )
//         .populate('comments')
//         .exec();
//
//       // console.log('Updated Post with New Comment:', post);
//       return res.status(201).json(post);
//     } catch (err) {
//       console.log('Error:', err.message || err);
//       return res.status(500).json({
//         message: 'Error when creating comment or updating post',
//         error: err.message || err,
//       });
//     }
//   },
//
//   removeComment: async function (req, res) {
//     const postId = req.params.id;
//     const commentId = req.params.commentId;
//
//     try {
//       const comment = await CommentModel.findByIdAndRemove(commentId);
//
//       if (!comment) {
//         return res.status(404).json({
//           message: 'No such comment',
//         });
//       }
//
//       const post = await PostModel.findByIdAndUpdate(
//         postId,
//         { $pull: { comments: commentId } },
//         { new: true },
//       )
//         .populate('comments')
//         .exec();
//
//       return res.status(204).json(post);
//     } catch (err) {
//       console.log('Error:', err.message || err);
//       return res.status(500).json({
//         message: 'Error when deleting comment or updating post',
//         error: err.message || err,
//       });
//     }
//   },
// };
