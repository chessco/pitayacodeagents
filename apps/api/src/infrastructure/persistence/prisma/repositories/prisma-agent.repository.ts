import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { IAgentRepository } from '../../../../domain/agents/agent.repository';
import { Agent } from '../../../../domain/agents/agent.entity';

@Injectable()
export class PrismaAgentRepository implements IAgentRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Agent[]> {
    const records = await this.prisma.client.agent.findMany();
    return records as Agent[];
  }

  async findOne(id: string): Promise<Agent | null> {
    const record = await this.prisma.client.agent.findUnique({ where: { id } });
    return record as Agent | null;
  }

  async create(data: Partial<Agent>): Promise<Agent> {
    const record = await this.prisma.client.agent.create({
      data: {
        name: data.name!,
        role: data.role!,
        skills: data.skills || [],
      },
    });
    return record as Agent;
  }

  async updateStatus(id: string, status: string): Promise<Agent> {
    const record = await this.prisma.client.agent.update({
      where: { id },
      data: { status },
    });
    return record as Agent;
  }
}

