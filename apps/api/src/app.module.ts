import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AgentsModule } from './modules/agents/agents.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { ApprovalsModule } from './modules/approvals/approvals.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { SiteProjectsModule } from './modules/site-projects/site-projects.module';

@Module({
  imports: [
    PrismaModule,
    AgentsModule,
    TasksModule,
    ApprovalsModule,
    DashboardModule,
    SiteProjectsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
