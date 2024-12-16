import {
  type CallbackWithoutResultAndOptionalError,
  model,
  Schema,
} from 'mongoose';
import { genSalt, hash } from 'bcrypt';

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
    password: {
      type: String,
      required: true,
      validate: {
        validator: (v: string) => /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(v),
        message: () =>
          'Password must be at least 8 characters, contain at least 1 capital letter and number',
      },
      select: false,
    },
    role: {
      type: String,
      enum: ['user', 'moderator', 'admin'],
      default: 'user',
    },
    bio: { type: String, default: '' },
    avatar: { type: String, default: '' },
    isBanned: { type: Boolean, default: false },
  },
  { timestamps: true },
);

UserSchema.pre(
  'save',
  async function (next: CallbackWithoutResultAndOptionalError) {
    if (!this.isModified('password')) return next();
    const salt = await genSalt();
    this.password = await hash(this.password, salt);

    next();
  },
);

UserSchema.post(
  'save',
  (error: any, next: CallbackWithoutResultAndOptionalError) => {
    if (error.code === 11000)
      next(
        new Error('This user already exists, use another username or email.'),
      );
    else next(error);
  },
);

export const UserEntity = model('User', UserSchema);
