import { Logger, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "../../../generated/prisma/client";

export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit() {
    await this.$connect();
    this.logger.log('DB connected!');
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}