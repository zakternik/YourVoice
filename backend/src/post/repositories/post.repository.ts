import { Types } from 'mongoose';
import { PostEntity } from '../../_common/entities/index.js';
import { createUserComment, deleteUserComment } from './comment.repository.js';
import { BadRequestError } from '../../_common/errors/index.js';

export const postsList = async () => PostEntity.find().populate('user');

export const findPostById = async (postId: string | Types.ObjectId) =>
  PostEntity.findById(postId)
    .populate('user')
    .populate({
      path: 'comments',
      populate: { path: 'user' },
    });

export const createUserPost = async (params: {
  userId: string | Types.ObjectId;
  title: string;
  content: string;
  category: string;
}) =>
  PostEntity.create({
    user: params.userId,
    title: params.title,
    content: params.content,
    category: params.category,
  });

export const updateUserPost = async (params: {
  userId: string | Types.ObjectId;
  title: string;
  content: string;
  category: string;
}) =>
  PostEntity.updateOne(
    { user: params.userId },
    {
      title: params.title,
      content: params.content,
      category: params.category,
    },
  );

export const deleteUserPost = async (params: {
  userId: string | Types.ObjectId;
  postId: string | Types.ObjectId;
}) => PostEntity.deleteOne({ user: params.userId, _id: params.postId });

export const addCommentToPost = async (params: {
  userId: string | Types.ObjectId;
  postId: string | Types.ObjectId;
  content: string;
}) => {
  const comment = await createUserComment(params);
  const post = await PostEntity.findById(params.postId);
  if (!post) throw new BadRequestError({ message: 'Post not found' });
  post.comments.push(comment._id);
  await post.save();

  return post;
};

export const removeCommentFromPost = async (params: {
  userId: string | Types.ObjectId;
  postId: string | Types.ObjectId;
  commentId: string | Types.ObjectId;
}) => {
  await deleteUserComment(params);
  const post = await PostEntity.findById(params.postId);
  if (!post) throw new BadRequestError({ message: 'Post not found' });

  post.comments = post.comments.filter(
    (c) => c.toString() !== params.commentId,
  );
  await post.save();

  return post;
};
