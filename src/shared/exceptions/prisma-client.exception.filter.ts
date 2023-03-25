import { Prisma } from '@prisma/client';
import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    //-- https://www.prisma.io/docs/reference/api-reference/error-reference#prisma-client-query-engine
    switch (exception.code) {
      case 'P2002': {
        const status = HttpStatus.CONFLICT;
        const message = `Unique constraint failed on the [${
          (exception as any).meta.target
        }]`;
        response.status(status).json({
          statusCode: status,
          message: message,
        });
        break;
      }
      case 'P2003': {
        const status = HttpStatus.CONFLICT;
        const message = `Foreign key constraint failed on the field: ${
          (exception as any).meta.field_name
        }`;
        response.status(status).json({
          statusCode: status,
          message: message,
        });
        break;
      }
      default: {
        // default 500 error code
        super.catch(exception, host);
        break;
      }
    }
  }
}
