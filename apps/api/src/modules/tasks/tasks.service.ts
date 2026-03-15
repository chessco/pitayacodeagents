import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  findAll() { return this.prisma.client.task.findMany({ include: { agentOwner: true } }); }

  async create(dto: CreateTaskDto) {
    const task = await this.prisma.client.task.create({ data: dto });
    await this.prisma.client.agent.update({
      where: { id: dto.agentOwnerId },
      data: { tasksPending: { increment: 1 } },
    });
    return task;
  }

  async update(id: string, dto: UpdateTaskDto) {
    const task = await this.prisma.client.task.update({ where: { id }, data: dto });
    if (dto.status === 'Completed') {
      await this.prisma.client.agent.update({
        where: { id: task.agentOwnerId },
        data: {
          tasksPending: { decrement: 1 },
          tasksCompleted: { increment: 1 },
        },
      });
    }
    return task;
  }
}
