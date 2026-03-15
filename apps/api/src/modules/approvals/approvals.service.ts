import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateApprovalDto } from './dto/create-approval.dto';
import { UpdateApprovalDto } from './dto/update-approval.dto';

@Injectable()
export class ApprovalsService {
  constructor(private prisma: PrismaService) {}

  findAll() { return this.prisma.approval.findMany({ include: { requesterAgent: true } }); }

  create(dto: CreateApprovalDto) { return this.prisma.approval.create({ data: dto }); }

  update(id: string, dto: UpdateApprovalDto) {
    return this.prisma.approval.update({ where: { id }, data: dto });
  }
}
