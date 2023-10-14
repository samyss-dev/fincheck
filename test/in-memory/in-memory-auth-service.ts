import { AuthService } from '@app/providers/auth-service';

export class InMemoryAuthService implements AuthService {
  async generateAccessToken(userId: string): Promise<string> {
    return 'token_' + userId;
  }
}
