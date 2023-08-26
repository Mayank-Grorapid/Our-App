import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as retry from 'retry';

async function bootstrap() {
  const retryOperation = retry.operation({
    retries: 5,
    factor: 2, 
    minTimeout: 1000, 
    maxTimeout: 15000, 
  });

  retryOperation.attempt(async () => {
    const app = await NestFactory.create(AppModule);
    await app.listen(3000);
  });
}
bootstrap();
