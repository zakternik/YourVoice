import type { NextFunction, Request, Response } from 'express';
import { varifyJwt } from '../../utils/index.js';
import { AuthorizationError } from '../../errors/index.js';

export const isAuthGuard = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authorization = req.headers.authorization;
  if (!authorization)
    throw new AuthorizationError({ message: 'Not authorized' });

  try {
    const token = authorization.split(' ')[1];
    req.user = varifyJwt(token!);
    next();
  } catch (err) {
    next(err);
  }
};
