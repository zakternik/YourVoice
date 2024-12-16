import { Types } from 'mongoose';
import { BadRequestError } from '../../_common/errors/index.js';
import { CommentEntity } from '../../_common/entities/index.js';

export const createUserComment = async (params: {
  userId: string | Types.ObjectId;
  content: string;
}) => {
  if (params.content.trim().length < 1) {
    throw new BadRequestError({ message: 'Comment content cannot be empty' });
  }
  return CommentEntity.create({
    user: params.userId,
    content: params.content,
  });
};

export const deleteUserComment = async (params: {
  userId: string | Types.ObjectId;
  commentId: string | Types.ObjectId;
}) =>
  CommentEntity.deleteOne({
    user: params.userId,
    _id: params.commentId,
  });
