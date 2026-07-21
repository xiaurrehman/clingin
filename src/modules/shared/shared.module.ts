import { Module } from '@nestjs/common';
import { MailService } from '../../mail/mail.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [MailService],
  exports: [MailService],
})
export class SharedModule {}