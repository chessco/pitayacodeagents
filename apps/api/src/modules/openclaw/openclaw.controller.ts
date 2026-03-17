import { Controller, Post, Body } from '@nestjs/common';
import { OpenClawService } from './openclaw.service';
import { OpenClawTaskRequest } from './openclaw.types';

@Controller('openclaw')
export class OpenClawController {
  constructor(private readonly openClawService: OpenClawService) {}

  @Post('dispatch')
  async dispatch(@Body() body: OpenClawTaskRequest) {
    return this.openClawService.dispatchTask(body);
  }
}
