import { Types } from 'mongoose';
import { PostEntity } from '../_common/entities/index.js';

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
