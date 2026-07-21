import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { PrismaExceptionFilter } from './common/filters/prisma-exception.filter';
import { HTTPExceptionFilter, AllExceptionsFilter } from './common/filters/http-exception.filter';
import cookieParser from 'cookie-parser';

/** Cap Prisma pool before any PrismaClient is constructed (Hostinger thread limits). */
function enforcePrismaPoolLimit(limit = 3) {
  const url = process.env.DATABASE_URL;
  if (!url) return;
  const withoutLimit = url
    .replace(/([?&])connection_limit=\d+/g, '$1')
    .replace(/[?&]$/, '')
    .replace(/\?&/, '?');
  const sep = withoutLimit.includes('?') ? '&' : '?';
  process.env.DATABASE_URL = `${withoutLimit}${sep}connection_limit=${limit}`;
}

enforcePrismaPoolLimit(3);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(
    new PrismaExceptionFilter(),
    new HTTPExceptionFilter(),
    new AllExceptionsFilter(),
  );

  app.enableCors({
    origin: true,
    credentials: true,
  });

  // Hostinger injects PORT; bind 0.0.0.0 so the proxy can reach the app
  const port = Number(process.env.PORT) || 3000;
  await app.listen(port, '0.0.0.0');
}
bootstrap();
