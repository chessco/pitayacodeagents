import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SiteProjectsService {
  constructor(private prisma: PrismaService) {}

  findAll() { return this.prisma.siteProject.findMany(); }
  create(data: any) { return this.prisma.siteProject.create({ data }); }
}
