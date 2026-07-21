import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const PRISMA_POOL_LIMIT = 3;

function databaseUrlWithPoolLimit(): string | undefined {
  const url = process.env.DATABASE_URL;
  if (!url) return undefined;
  // Always force a small pool (Hostinger shared hosting)
  const withoutLimit = url
    .replace(/([?&])connection_limit=\d+/g, '$1')
    .replace(/[?&]$/, '')
    .replace(/\?&/, '?');
  const sep = withoutLimit.includes('?') ? '&' : '?';
  return `${withoutLimit}${sep}connection_limit=${PRISMA_POOL_LIMIT}`;
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
