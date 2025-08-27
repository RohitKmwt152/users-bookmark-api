import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable body parsing for JSON
  app.use(express.json());

  // Enable form data parsing
  app.use(express.urlencoded({ extended: true }));

  // Enable multipart form data (if you're using file uploads)
  // app.use(express.raw({ type: 'multipart/form-data' }));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
