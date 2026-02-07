import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  app.enableCors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  });

  const port = process.env.PORT;

  await app.listen(process.env.PORT ?? 3001);

  console.log(`running in ${port} port`);
  console.log(`server runing in http://localhost:${port}`);
}
bootstrap();
