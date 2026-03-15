import { Approval } from './approval.entity';
export interface IApprovalRepository {
  findAll(): Promise<Approval[]>;
  updateStatus(id: string, status: string): Promise<Approval>;
}
