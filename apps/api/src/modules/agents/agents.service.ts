import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAgentDto } from './dto/create-agent.dto';

@Injectable()
export class AgentsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.agent.findMany({ include: { tasks: true } });
  }

  findOne(id: string) {
    return this.prisma.agent.findUnique({ where: { id }, include: { tasks: true } });
  }

  create(dto: CreateAgentDto) {
    return this.prisma.agent.create({
      data: {
        name: dto.name,
        role: dto.role,
        skills: dto.skills || [],
      },
    });
  }

  updateStatus(id: string, status: string) {
    return this.prisma.agent.update({
      where: { id },
      data: { status },
    });
  }
}
