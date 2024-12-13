import { ApiError } from './ApiError.js';
import { HttpStatusCode } from '../utils/index.js';
import type { KnownApiErrorParams } from './types/index.js';

export class AlreadyExistsError extends ApiError {
  constructor(data: KnownApiErrorParams) {
    super({
      additionalData: data.additionalData,
      message: data.message,
      status: HttpStatusCode.ALREADY_EXISTS,
    });
  }
}