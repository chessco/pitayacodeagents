import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { tenantContext } from '../common/context/tenant.context';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super();
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  get client() {
    const tenantId = tenantContext.getStore();
    if (!tenantId) {
      return this; // Fallback to normal client
    }

    // Prisma Client  for automatic tenant injection
    return this.$extends({
      query: {
        $allModels: {
          async findMany({ args, query }) {
            args.where = { ...args.where, tenantId } as any;
            return query(args);
          },
          async findUnique({ args, query }) {
            args.where = { ...args.where, tenantId } as any;
            return query(args);
          },
          async create({ args, query }) {
            args.data = { ...args.data, tenantId } as any;
            return query(args);
          },
          async update({ args, query }) {
            args.where = { ...args.where, tenantId } as any;
            return query(args);
          },
          async count({ args, query }) {
            args.where = { ...args.where, tenantId } as any;
            return query(args);
          },
          // Add delete/updateMany if desired
        },
      },
    });
  }
}

