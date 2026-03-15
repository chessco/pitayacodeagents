import { Controller, Get, Patch, Param, Body } from '@nestjs/common';
import { GetApprovalsUseCase } from '../../../application/use-cases/approvals/get-approvals.usecase';

@Controller('approvals')
export class ApprovalsController {
  constructor(private readonly getApprovalsUc: GetApprovalsUseCase) {}

  @Get()
  findAll() { return this.getApprovalsUc.execute(); }
}
