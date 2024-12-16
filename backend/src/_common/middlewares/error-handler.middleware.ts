import { type NextFunction, type Request, type Response } from 'express';
import { ApiError } from '../errors/index.js';

export const globalErrorHandler = async (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const apiError =
    error instanceof ApiError ? error : ApiError.fromError(error);
  res.status(apiError.status).json({
    name: apiError.name,
    message: apiError.message,
    data: apiError.data,
  });
};
