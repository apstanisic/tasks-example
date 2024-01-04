/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { getFirstProperty } from './utils/get-first-property';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';

  app.setGlobalPrefix(globalPrefix);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidUnknownValues: true,
      whitelist: true,
      exceptionFactory: (errors) => {
        const response = {
          message: 'Your data is invalid',
          statusCode: 400,
          errors: {} as Record<string, unknown>,
        };

        for (const err of errors) {
          response.errors[err.property] = getFirstProperty(
            err.constraints ?? {}
          );
        }
        return new BadRequestException(response);
      },
    })
  );

  app.enableCors({ credentials: true, origin: ['http://localhost:4200'] });

  const port = process.env.PORT || 5000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
