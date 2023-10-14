import { Module } from '@nestjs/common';
import { DatabaseModule } from './infra/database/database.module';
import { ProvidersModule } from './infra/providers/providers.module';
import { WebModule } from './infra/web/web.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@infra/web/auth/auth.guard';

@Module({
  imports: [DatabaseModule, ProvidersModule, WebModule],
  providers: [{ provide: APP_GUARD, useClass: AuthGuard }],
})
export class AppModule {}
