import { ConflictException, Injectable } from '@nestjs/common';
import { UsersRepository } from '@app/repositories/users-repository';
import { PasswordHasher } from '@app/providers/password-hasher';
import { User } from '@domain/User';
import { AuthService } from '@app/providers/auth-service';

interface SignUpRequest {
  name: string;
  email: string;
  password: string;
}

@Injectable()
export class SignUp {
  constructor(
    private usersRepo: UsersRepository,
    private passwordHasher: PasswordHasher,
    private authService: AuthService,
  ) {}

  async execute(request: SignUpRequest): Promise<string> {
    const { name, email, password } = request;

    const emailInUse = await this.usersRepo.findByEmail(email);

    if (emailInUse) throw new ConflictException('Email in use.');

    const hashedPassword = await this.passwordHasher.hash(password);

    const user = await this.usersRepo.create(
      new User({
        name,
        email,
        password: hashedPassword,
      }),
    );

    return await this.authService.generateAccessToken(user.id);
  }
}
