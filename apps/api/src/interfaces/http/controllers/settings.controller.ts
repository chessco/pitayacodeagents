import { Controller, Get, Post, Body } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Controller('settings')
export class SettingsController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async getSettings() {
    // Retorna el primer Tenant para simplificar MVP
    return this.prisma.client.tenant.findFirst();
  }

  @Post()
  async updateSettings(@Body() body: { name: string }) {
    const tenant = await this.prisma.client.tenant.findFirst();
    if (!tenant) throw new Error('No tenant found');
    
    return this.prisma.client.tenant.update({
      where: { id: tenant.id },
      data: { name: body.name }
    });
  }
}
