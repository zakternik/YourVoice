import { UserEntity } from '../../_common/entities/index.js';
import { AuthorizationError } from '../../_common/errors/index.js';
import { compare } from 'bcrypt';

export const loginUser = async (username: string, password: string) => {
  const user = await UserEntity.findOne({
    $or: [{ username: username }, { email: username }],
  });

  if (user === null) {
    throw new AuthorizationError({
      message: 'Incorrect username or password',
    });
  }

  const isPasswordValid = await compare(user.password, password);

  if (!isPasswordValid) {
    throw new AuthorizationError({
      message: 'Incorrect username or password',
    });
  }

  return user;
};
