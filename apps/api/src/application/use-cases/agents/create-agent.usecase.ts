import { Injectable, Inject } from '@nestjs/common';
import { IAgentRepository } from '../../../domain/agents/agent.repository';
import { Agent } from '../../../domain/agents/agent.entity';

@Injectable()
export class CreateAgentUseCase {
  constructor(
    @Inject('IAgentRepository') private readonly repo: IAgentRepository
  ) {}

  execute(dto: Partial<Agent>) { return this.repo.create(dto); }
}
