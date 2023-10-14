import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SignIn } from '@app/use-cases/auth/sign-in';
import { SignUp } from '@app/use-cases/auth/sign-up';
import { ProvidersModule } from '@infra/providers/providers.module';

@Module({
  imports: [ProvidersModule],
  controllers: [AuthController],
  providers: [AuthService, SignIn, SignUp],
})
export class AuthModule {}
