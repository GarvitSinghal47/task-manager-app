import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

export const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const PORT = process.env.PORT || 9898;
  await app.listen(PORT, () => Logger.log(`Backend is listening on port ${PORT}`));
};

bootstrap();
