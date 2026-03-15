import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AgentsModule } from './modules/agents/agents.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { ApprovalsModule } from './modules/approvals/approvals.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { SiteProjectsModule } from './modules/site-projects/site-projects.module';
import { TenantMiddleware } from './common/middleware/tenant.middleware';

@Module({
  imports: [
    PrismaModule,
    AgentsModule,
    TasksModule,
    ApprovalsModule,
    DashboardModule,
    SiteProjectsModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TenantMiddleware)
      .forRoutes('*'); // Apply to all routes
  }
}
