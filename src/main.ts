import { ValidationError, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import { ValidationException } from './shared/exceptions/validation.exception';
import { ResponseTransform } from './shared/interceptors/response-transform.interceptor';
import {
  HttpExceptionFilter,
  ValidationFilter,
} from './shared/filters/http-exception.filter';
import { PrismaClientExceptionFilter } from './shared/exceptions/prisma-client.exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(bodyParser.json({ limit: '5mb' }));
  app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

  // apply transform to all responses
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new ValidationFilter());
  app.useGlobalInterceptors(new ResponseTransform());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      disableErrorMessages: false,
      skipMissingProperties: false,
      exceptionFactory: (errors: ValidationError[]) => {
        const messages = errors.map((error) => {
          return {
            error: `${error.property} has wrong value ${error.value}.`,
            message: Object.values(error.constraints).join(''),
          };
        });
        return new ValidationException(messages);
      },
    }),
  );

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter as any));

  app.enableCors();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
