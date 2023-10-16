import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  NotFoundException,
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

    console.log(exception.getResponse());

    response.status(status).json({
      isSuccess: status == 200,
      statusCode: status,
      message: exception.getResponse(),
    });
  }
}

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: NotFoundException, host: ArgumentsHost): any {
    const context = host.switchToHttp();
    const request = context.getRequest();
    const response = context.getResponse();

    return response.status(404).json({
      isSuccess: false,
      statusCode: 404,
      message: 'Not found',
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
