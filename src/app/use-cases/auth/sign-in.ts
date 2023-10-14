import { AuthService } from '@app/providers/auth-service';
import { PasswordHasher } from '@app/providers/password-hasher';
import { UsersRepository } from '@app/repositories/users-repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';

interface SignInRequest {
  email: string;
  password: string;
}

@Injectable()
export class SignIn {
  constructor(
    private usersRepo: UsersRepository,
    private passwordHasher: PasswordHasher,
    private authService: AuthService,
  ) {}
  async execute(request: SignInRequest): Promise<string> {
    const { email, password } = request;

    const user = await this.usersRepo.findByEmail(email);

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isPasswordValid = await this.passwordHasher.compare(
      password,
      user.password,
    );

    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid credentials');

    return await this.authService.generateAccessToken(user.id);
  }
}
