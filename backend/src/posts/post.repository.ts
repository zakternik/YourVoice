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
