import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ProductsModule } from './modules/products/products.module';
import { OrdersModule } from './modules/orders/orders.module';
import { AccessProgramModule } from './modules/access-program/access-program.module';
import { SharedModule } from './modules/shared/shared.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ProductsModule,
    OrdersModule,
    AccessProgramModule,
    SharedModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
