import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config';
import { MicroserviceOptions, RpcException, Transport } from '@nestjs/microservices';
import { HttpStatus, Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Main - Auth Ms');

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.NATS,
    options: {
      servers: envs.nats_servers
    }
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    exceptionFactory: (error) => {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error
      })
    }
  }));

  await app.listen();
  logger.log(`App running on ${envs.port}`);
}
bootstrap();
