import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  // `onModuleInit` mark method as async/await
  async onModuleInit() {
    await this.$connect();
  }
}
