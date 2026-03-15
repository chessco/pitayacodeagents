import { Module } from '@nestjs/common';
import { SiteProjectsController } from './site-projects.controller';
import { SiteProjectsService } from './site-projects.service';

@Module({
  controllers: [SiteProjectsController],
  providers: [SiteProjectsService],
})
export class SiteProjectsModule {}
