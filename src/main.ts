import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { LoggerMiddleware } from './middleware/logger.middleware.js';
import { LoggerInterceptor } from './interceptors/logger.interceptor.js';
import { ApiKeyMiddleware } from './middleware/apikey.middleware.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

   // Register middleware globally
  const logger = new LoggerMiddleware();
  const apiKeyMiddleware = new ApiKeyMiddleware();
  app.use(logger.use.bind(logger));
  app.use(apiKeyMiddleware.use.bind(apiKeyMiddleware));

   app.useGlobalInterceptors(new LoggerInterceptor());
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
