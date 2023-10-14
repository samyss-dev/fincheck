import { Module } from '@nestjs/common';
import { BcryptPasswordHasher } from './bcrypt-password-hasher';
import { PasswordHasher } from '@app/providers/password-hasher';
import { AuthService } from '@app/providers/auth-service';
import { JwtAuthService } from './jwt-auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1y' },
    }),
  ],
  providers: [
    { provide: PasswordHasher, useClass: BcryptPasswordHasher },
    { provide: AuthService, useClass: JwtAuthService },
  ],
  exports: [PasswordHasher, AuthService],
})
export class ProvidersModule {}
