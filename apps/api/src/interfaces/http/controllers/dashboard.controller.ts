import { Controller, Get } from '@nestjs/common';
import { GetDashboardMetricsUseCase } from '../../../application/use-cases/dashboard/get-metrics.usecase';

@Controller('dashboard/metrics')
export class DashboardController {
  constructor(private readonly getMetricsUc: GetDashboardMetricsUseCase) {}

  @Get()
  getMetrics() { return this.getMetricsUc.execute(); }
}
