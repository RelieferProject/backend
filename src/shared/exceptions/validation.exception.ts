import { BadRequestException } from '@nestjs/common';
interface Error {
  error: string;
  message: string;
}
export class ValidationException extends BadRequestException {
  public example = {};
  constructor(public validationErrors: Error[]) {
    super();
    for (const err of validationErrors) {
      const variable = err.message.match(/^[^\s]*/g)[0];
      this.example[variable] = '';
    }
  }
}
