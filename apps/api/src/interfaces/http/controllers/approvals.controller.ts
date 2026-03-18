import { Controller, Get, Post, Param } from '@nestjs/common';
import { GetApprovalsUseCase } from '../../../application/use-cases/approvals/get-approvals.usecase';
import { PrismaService } from '../../../prisma/prisma.service';

@Controller('approvals')
export class ApprovalsController {
  constructor(
    private readonly getApprovalsUc: GetApprovalsUseCase,
    private readonly prisma: PrismaService,
  ) {}

  @Get()
  findAll() { return this.getApprovalsUc.execute(); }

  @Post(':id/approve')
  async approve(@Param('id') id: string) {
    return this.prisma.approval.update({
      where: { id },
      data: { status: 'APPROVED' },
    });
  }

  @Post(':id/reject')
  async reject(@Param('id') id: string) {
    return this.prisma.approval.update({
      where: { id },
      data: { status: 'REJECTED' },
    });
  }
}
