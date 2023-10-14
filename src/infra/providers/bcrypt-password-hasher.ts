import { PasswordHasher } from '@app/providers/password-hasher';
import { hash, compare } from 'bcryptjs';

export class BcryptPasswordHasher implements PasswordHasher {
  async hash(password: string): Promise<string> {
    const hashedPassword = await hash(password, 12);

    return hashedPassword;
  }

  async compare(password: string, hashedPassword: string): Promise<boolean> {
    const comparedPassword = await compare(password, hashedPassword);

    return comparedPassword;
  }
}
