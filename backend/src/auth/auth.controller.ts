import type { Request, Response } from 'express';
import { generateJWTToken, HttpStatusCode } from '../_common/utils/index.js';
import { createUser } from '../user/repositories/user.repository.js';
import { loginUser } from './repositories/auth.repository.js';

export const signup = async (req: Request, res: Response) => {
  const email: string = req.body.email;
  const username: string = req.body.username;
  const password: string = req.body.password;

  const user = await createUser(username, email, password);

  res.status(HttpStatusCode.CREATED).json({
    message: 'User successfully registered',
    id: user._id,
  });
};

export const signin = async (req: Request, res: Response) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = await loginUser(username, password);

  const jwtToken = await generateJWTToken({
    id: user._id.toString(),
    email: user.email,
    username: user.username,
  });

  res.status(HttpStatusCode.OK).json({
    token: jwtToken,
  });
};
