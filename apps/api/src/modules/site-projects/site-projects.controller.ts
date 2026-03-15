import { Controller, Get, Post, Body } from '@nestjs/common';
import { SiteProjectsService } from './site-projects.service';

@Controller('site-projects')
export class SiteProjectsController {
  constructor(private readonly service: SiteProjectsService) {}

  @Get()
  findAll() { return this.service.findAll(); }

  @Post()
  create(@Body() dto: any) { return this.service.create(dto); }
}
