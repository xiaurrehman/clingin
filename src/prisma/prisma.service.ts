import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

function databaseUrlWithPoolLimit(): string | undefined {
  const url = process.env.DATABASE_URL;
  if (!url) return undefined;
  // Hostinger shared hosting: keep Prisma pool small to avoid thread/process limits
  if (/[?&]connection_limit=/.test(url)) return url;
  return url.includes('?')
    ? `${url}&connection_limit=5`
    : `${url}?connection_limit=5`;
}

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      datasources: {
        db: {
          url: databaseUrlWithPoolLimit(),
        },
      },
      log:
        process.env.NODE_ENV === 'production'
          ? ['error', 'warn']
          : ['query', 'info', 'warn', 'error'],
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
