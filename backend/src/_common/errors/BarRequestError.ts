import { ApiError } from './ApiError.js';
import type { KnownApiErrorParams } from './types/index.js';
import { HttpStatusCode } from '../utils/index.js';

export class BadRequestError extends ApiError {
  constructor(data: KnownApiErrorParams) {
    super({
      additionalData: data.additionalData,
      message: data.message,
      status: HttpStatusCode.BAD_REQUEST,
    });
  }
}
