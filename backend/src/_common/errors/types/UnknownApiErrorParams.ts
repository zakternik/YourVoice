import { HttpStatusCode } from '../../utils/index.js';

export interface UnknownApiErrorParams {
  readonly message: string;
  readonly status: HttpStatusCode;
  readonly additionalData?: object;
}