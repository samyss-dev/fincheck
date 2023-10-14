import { PasswordHasher } from '@app/providers/password-hasher';

export class InMemoryPasswordHasher implements PasswordHasher {
  async hash(password: string): Promise<string> {
    return 'hashed_' + password;
  }

  async compare(password: string, hashedPassword: string): Promise<boolean> {
    return hashedPassword === 'hashed_' + password;
  }
}
