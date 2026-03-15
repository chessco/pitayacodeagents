import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { ITaskRepository } from '../../../../domain/tasks/task.repository';
import { Task } from '../../../../domain/tasks/task.entity';

@Injectable()
export class PrismaTaskRepository implements ITaskRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Task[]> {
    const records = await this.prisma.client.task.findMany({ include: { agentOwner: true } });
    return records as Task[];
  }

  async create(data: Partial<Task>): Promise<Task> {
    const record = await this.prisma.client.task.create({ data: data as any });
    await this.prisma.client.agent.update({
      where: { id: data.agentOwnerId },
      data: { tasksPending: { increment: 1 } },
    });
    return record as Task;
  }

  async update(id: string, update: Partial<Task>): Promise<Task> {
    const record = await this.prisma.client.task.update({ where: { id }, data: update });
    if (update.status === 'Completed') {
      await this.prisma.client.agent.update({
        where: { id: record.agentOwnerId },
        data: {
          tasksPending: { decrement: 1 },
          tasksCompleted: { increment: 1 },
        },
      });
    }
    return record as Task;
  }
}

