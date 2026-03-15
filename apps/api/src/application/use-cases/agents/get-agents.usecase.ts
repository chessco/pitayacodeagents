import { Injectable, Inject } from '@nestjs/common';
import type { IAgentRepository } from '../../../domain/agents/agent.repository';

@Injectable()
export class GetAgentsUseCase {
  constructor(
    @Inject('IAgentRepository') private readonly repo: IAgentRepository
  ) {}

  execute() { return this.repo.findAll(); }
}

