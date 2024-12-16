import type { UnknownApiErrorParams } from './types/index.js';
import { HttpStatusCode } from '../utils/index.js';

export class ApiError implements Error {
  public readonly name: string;
  public readonly message: string;
  public readonly status: HttpStatusCode;
  public readonly data?: object;

  constructor(data: UnknownApiErrorParams) {
    this.message = data.message;
    this.name = 'Api Error';
    this.status = data.status;
    this.data = data.additionalData;
  }

  static fromError(error: Error): ApiError {
    return new ApiError({
      status: HttpStatusCode.SERVER_ERROR,
      message: error.message,
    });
  }
}