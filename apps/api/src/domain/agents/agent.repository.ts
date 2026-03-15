import { Agent } from './agent.entity';

export interface IAgentRepository {
  findAll(): Promise<Agent[]>;
  findOne(id: string): Promise<Agent | null>;
  create(agent: Partial<Agent>): Promise<Agent>;
  updateStatus(id: string, status: string): Promise<Agent>;
}
