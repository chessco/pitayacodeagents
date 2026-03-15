import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class GetDashboardMetricsUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute() {
    const [agents, tasks, approvals] = await Promise.all([
      this.prisma.client.agent.count().catch(() => 0),
      this.prisma.client.task.count({ where: { status: 'Completed' } }).catch(() => 0),
      this.prisma.client.approval.count({ where: { status: 'Pending' } }).catch(() => 0),
    ]);

    return {
      agentsActive: agents,
      tasksCompleted: tasks,
      pendingApprovals: approvals,
      leadsGenerated: 42,
      turnaroundTime: "2.5 hrs"
    };
  }
}
