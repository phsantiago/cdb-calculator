import { NestFactory } from '@nestjs/core';
import { AppModule } from './main.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT || 8080);
}
bootstrap();
