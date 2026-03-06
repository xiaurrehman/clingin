import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { PrismaExceptionFilter } from './common/filters/prisma-exception.filter';
import { HTTPExceptionFilter, AllExceptionsFilter } from './common/filters/http-exception.filter';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser())

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));

  app.useGlobalFilters(
    new PrismaExceptionFilter(),
    new HTTPExceptionFilter(),
    new AllExceptionsFilter(),
  );
  // app.enableCors({ 
  //   origin: ['http://localhost:3001'], // Next.js frontend URL
  //   credentials: true,                
  // });

  app.enableCors({ 
    origin: [process.env.USER_FRONTEND_URL,' https://clingin.aestheticsloungepk.com', 'http'], // Next.js frontend URL
    credentials: true,                
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
