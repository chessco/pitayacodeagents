import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getMetrics() {
    const leadsCount = await this.prisma.metric.aggregate({
      _sum: { value: true },
      where: { key: 'leadsGenerated' },
    });
    const tasksCompleted = await this.prisma.task.count({
      where: { status: 'Completed' },
    });
    const siteProjects = await this.prisma.siteProject.count();

    return {
      leadsGenerated: leadsCount._sum.value || 0,
      tasksCompleted,
      campaignsLaunched: 12, // Dummy static for visual
      approvalTurnaroundTime: "2.5 hrs",
      siteProjectsTotal: siteProjects,
    };
  }
}
