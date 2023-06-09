import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { ValidationException } from '../exceptions/validation.exception';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const status = exception ? exception.getStatus() : 500;

    response.status(status).json({
      isSuccess: status == 200,
      statusCode: status,
      message: exception.getResponse(),
    });
  }
}

@Catch(ValidationException)
export class ValidationFilter implements ExceptionFilter {
  catch(exception: ValidationException, host: ArgumentsHost): any {
    const context = host.switchToHttp();
    const request = context.getRequest();
    const response = context.getResponse();

    return response.status(400).json({
      isSuccess: false,
      statusCode: 400,
      validationErrors: exception.validationErrors,
      example: exception.example,
    });
  }
}
