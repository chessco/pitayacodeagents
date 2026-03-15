import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { tenantContext } from '../context/tenant.context';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const tenantId = req.headers['x-tenant-id'] as string;
    
    // In production, we'd validate the tenant id against the DB here
    if (!tenantId) {
      throw new UnauthorizedException('Tenant ID (x-tenant-id) is required');
    }

    tenantContext.run(tenantId, () => {
      next();
    });
  }
}
