import { Controller, Get, Post, Patch, Body, Param } from '@nestjs/common';
import { AgentsService } from './agents.service';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentStatusDto } from './dto/update-agent-status.dto';

@Controller('agents')
export class AgentsController {
  constructor(private readonly service: AgentsService) {}

  @Get()
  findAll() { return this.service.findAll(); }

  @Get(':id')
  findOne(@Param('id') id: string) { return this.service.findOne(id); }

  @Post()
  create(@Body() dto: CreateAgentDto) { return this.service.create(dto); }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() dto: UpdateAgentStatusDto) {
    return this.service.updateStatus(id, dto.status);
  }
}
