import { model, Schema } from 'mongoose';

const CommentSchema = new Schema(
  {
    content: { type: String, required: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
);

export const CommentEntity = model('Comment', CommentSchema);
