import type { Request, Response } from 'express';
import { getUserById } from './repositories/user.repository.js';
import { NotFoundError } from '../_common/errors/index.js';
import { HttpStatusCode } from '../_common/utils/index.js';

export const getUserInfo = async (req: Request, res: Response) => {
  const user = await getUserById(req.user!.id);

  if (!user) throw new NotFoundError({ message: 'User not found' });

  res.status(HttpStatusCode.OK).json({
    email: user.email,
    username: user.username,
  });
};
