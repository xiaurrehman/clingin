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
//   app.enableCors({
//   origin: [
//     'https://clingin.aestheticsloungepk.com',
//      'https://api.aestheticsloungepk.com',
//     'https://www.api.aestheticsloungepk.com',
//     'http://localhost:3000',
//     'http://localhost:3001'
//   ],
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
//   allowedHeaders: 'Content-Type, Accept, Authorization',
//   credentials: true,
// });

  app.enableCors({ 
    origin: true, // Next.js frontend URL
    credentials: true,                
  });

  // Hostinger injects PORT; bind 0.0.0.0 so the proxy can reach the app
  const port = Number(process.env.PORT) || 3000;
  await app.listen(port, '0.0.0.0');
}
bootstrap();
