import { AuthService } from '@app/providers/auth-service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthService implements AuthService {
  constructor(private jwtService: JwtService) {}

  async generateAccessToken(userId: string): Promise<string> {
    return await this.jwtService.signAsync({ sub: userId });
  }
}
