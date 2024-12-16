import { UserEntity } from '../../_common/entities/index.js';
import { Types } from 'mongoose';

export const createUser = async (
  username: string,
  email: string,
  password: string,
) => {
  return UserEntity.create({
    email: email,
    username: username,
    password: password,
  });
};

export const getUserById = async (id: string | Types.ObjectId) =>
  UserEntity.findById(id);
