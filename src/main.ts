import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { LoggingService } from './logging/logging.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const loggingService = app.get(LoggingService);

  const port = process.env.PORT || 4000;
  await app.listen(port);
  loggingService.log(`Application is running on port ${port}`, 'Bootstrap');
}
bootstrap();
