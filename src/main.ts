import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HTTPResponseInterceptor } from './utils/cors/http.response-interceptor';
import { HttpExceptionFilter } from './utils/cors/http.exception-filter';
import { setupSwagger } from './utils/swagger/swagger-setup';

async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new HTTPResponseInterceptor());
  await setupSwagger(app);
  app.enableCors();
  await app.listen(PORT);
  console.log(`App is running on: ${await app.getUrl()}`);
}
bootstrap();
