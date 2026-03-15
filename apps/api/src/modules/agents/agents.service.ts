import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAgentDto } from './dto/create-agent.dto';

@Injectable()
export class AgentsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.client.agent.findMany();
  }

  findOne(id: string) {
    return this.prisma.client.agent.findUnique({ where: { id } });
  }

  create(dto: CreateAgentDto) {
    return this.prisma.client.agent.create({
      data: {
        name: dto.name,
        role: dto.role,
        skills: dto.skills || [],
      },
    });
  }

  updateStatus(id: string, status: string) {
    return this.prisma.client.agent.update({
      where: { id },
      data: { status },
    });
  }
}
