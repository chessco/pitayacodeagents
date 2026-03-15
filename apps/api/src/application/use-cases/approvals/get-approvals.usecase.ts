import { Injectable, Inject } from '@nestjs/common';
import { IApprovalRepository } from '../../../domain/approvals/approval.repository';

@Injectable()
export class GetApprovalsUseCase {
  constructor(@Inject('IApprovalRepository') private readonly repo: IApprovalRepository) {}
  execute() { return this.repo.findAll(); }
}
