import { Module } from '@nestjs/common';
import { AccessProgramService } from './access-program.service';
import { AccessProgramController } from './access-program.controller';

@Module({
  controllers: [AccessProgramController],
  providers: [AccessProgramService],
})
export class AccessProgramModule {}
