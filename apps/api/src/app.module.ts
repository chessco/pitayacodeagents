import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { TenantMiddleware } from './common/middleware/tenant.middleware';

import { AgentsController } from './interfaces/http/controllers/agents.controller';
import { TasksController } from './interfaces/http/controllers/tasks.controller';

import { GetAgentsUseCase } from './application/use-cases/agents/get-agents.usecase';
import { CreateAgentUseCase } from './application/use-cases/agents/create-agent.usecase';
import { GetTasksUseCase } from './application/use-cases/tasks/get-tasks.usecase';

import { PrismaAgentRepository } from './infrastructure/persistence/prisma/repositories/prisma-agent.repository';
import { PrismaTaskRepository } from './infrastructure/persistence/prisma/repositories/prisma-task.repository';

@Module({
  imports: [PrismaModule],
  controllers: [
    AgentsController,
    TasksController
  ],
  providers: [
    // Use Cases
    GetAgentsUseCase,
    CreateAgentUseCase,
    GetTasksUseCase,

    // Repositories (Interface to Implementation wire)
    {
      provide: 'IAgentRepository',
      useClass: PrismaAgentRepository,
    },
    {
      provide: 'ITaskRepository',
      useClass: PrismaTaskRepository,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TenantMiddleware)
      .forRoutes('*');
  }
}
