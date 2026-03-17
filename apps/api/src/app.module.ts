import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { TenantMiddleware } from './common/middleware/tenant.middleware';
import { OpenClawModule } from './modules/openclaw/openclaw.module';

import { AgentsController } from './interfaces/http/controllers/agents.controller';
import { TasksController } from './interfaces/http/controllers/tasks.controller';
import { ApprovalsController } from './interfaces/http/controllers/approvals.controller';
import { DashboardController } from './interfaces/http/controllers/dashboard.controller';

import { GetAgentsUseCase } from './application/use-cases/agents/get-agents.usecase';
import { CreateAgentUseCase } from './application/use-cases/agents/create-agent.usecase';
import { GetTasksUseCase } from './application/use-cases/tasks/get-tasks.usecase';
import { GetApprovalsUseCase } from './application/use-cases/approvals/get-approvals.usecase';
import { GetDashboardMetricsUseCase } from './application/use-cases/dashboard/get-metrics.usecase';

import { PrismaAgentRepository } from './infrastructure/persistence/prisma/repositories/prisma-agent.repository';
import { PrismaTaskRepository } from './infrastructure/persistence/prisma/repositories/prisma-task.repository';
import { PrismaApprovalRepository } from './infrastructure/persistence/prisma/repositories/prisma-approval.repository';

@Module({
  imports: [PrismaModule, OpenClawModule],
  controllers: [
    AgentsController,
    TasksController,
    ApprovalsController,
    DashboardController
  ],
  providers: [
    GetAgentsUseCase, CreateAgentUseCase,
    GetTasksUseCase,
    GetApprovalsUseCase,
    GetDashboardMetricsUseCase,
    { provide: 'IAgentRepository', useClass: PrismaAgentRepository },
    { provide: 'ITaskRepository', useClass: PrismaTaskRepository },
    { provide: 'IApprovalRepository', useClass: PrismaApprovalRepository }
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) { consumer.apply(TenantMiddleware).forRoutes('*'); }
}
