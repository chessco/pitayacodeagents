import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { OpenClawService } from './openclaw.service';
import { OpenClawTaskRequest } from './openclaw.types';

@Controller('openclaw')
export class OpenClawController {
  constructor(private readonly openClawService: OpenClawService) {}

  @Post('dispatch')
  async dispatch(@Body() body: OpenClawTaskRequest) {
    return this.openClawService.dispatchTask(body);
  }

  @Get('operations')
  async getOperations() {
    return this.openClawService.getOperations();
  }

  @Post('resume')
  async resume(@Body() body: { sessionKey: string, agent: string, message?: string }) {
    return this.openClawService.resumeSession(body);
  }

  @Get('automations')
  async getAutomations() {
    return this.openClawService.getAutomations();
  }

  @Post('automations')
  async createAutomation(@Body() body: any) {
    return this.openClawService.createAutomation(body);
  }

  @Post('automations/:id/run')
  async runAutomation(@Param('id') id: string) {
    return this.openClawService.executeAutomation(id);
  }

  @Post('automations/:id/status')
  async updateStatus(@Param('id') id: string, @Body() body: { status: string }) {
    return this.openClawService.updateAutomationStatus(id, body.status);
  }
}
