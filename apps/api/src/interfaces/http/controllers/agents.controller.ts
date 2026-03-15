import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { GetAgentsUseCase } from '../../../application/use-cases/agents/get-agents.usecase';
import { CreateAgentUseCase } from '../../../application/use-cases/agents/create-agent.usecase';
import { CreateAgentDto } from '../dto/create-agent.dto';

@Controller('agents')
export class AgentsController {
  constructor(
    private readonly getAgentsUc: GetAgentsUseCase,
    private readonly createAgentUc: CreateAgentUseCase,
  ) {}

  @Get()
  findAll() { return this.getAgentsUc.execute(); }

  @Post()
  create(@Body() dto: CreateAgentDto) { return this.createAgentUc.execute(dto); }
}
