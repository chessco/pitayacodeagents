import { Module } from '@nestjs/common';
import { OpenClawService } from './openclaw.service';
import { OpenClawController } from './openclaw.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [OpenClawController],
  providers: [OpenClawService],
  exports: [OpenClawService],
})
export class OpenClawModule {}
