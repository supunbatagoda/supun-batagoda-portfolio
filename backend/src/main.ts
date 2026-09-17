import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { ZodValidationPipe } from 'nestjs-zod';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  // Set global API route prefix
  app.setGlobalPrefix('api');

  // Global Zod validation pipe
  app.useGlobalPipes(new ZodValidationPipe());

  // Configure CORS securely
  const allowedOrigins = process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(',').map((origin) => origin.trim())
    : ['http://localhost:3000'];

  app.enableCors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  });

  // Enable graceful shutdown hooks
  app.enableShutdownHooks();

  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;
  // Security: explicitly listen on 127.0.0.1 rather than 0.0.0.0 in dev/testing
  const host = '127.0.0.1';

  await app.listen(port, host);
  logger.log(`Backend NestJS application is running at: http://${host}:${port}/api`);
  logger.log(`Health endpoint: http://${host}:${port}/api/health`);
  logger.log(`Projects endpoint: http://${host}:${port}/api/projects`);
}

bootstrap().catch((err) => {
  console.error('Fatal error during NestJS bootstrap:', err);
  process.exit(1);
});
