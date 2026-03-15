import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { IApprovalRepository } from '../../../../domain/approvals/approval.repository';
import { Approval } from '../../../../domain/approvals/approval.entity';

@Injectable()
export class PrismaApprovalRepository implements IApprovalRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Approval[]> {
    const records = await this.prisma.client.approval.findMany({ include: { agentRequester: true } });
    return records as any[];
  }

  async updateStatus(id: string, status: string): Promise<Approval> {
    return this.prisma.client.approval.update({ where: { id }, data: { status } }) as any;
  }
}
