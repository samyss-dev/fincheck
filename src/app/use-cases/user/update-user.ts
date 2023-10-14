import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { UsersRepository } from '@app/repositories/users-repository';
import { PasswordHasher } from '@app/providers/password-hasher';
import { User } from '@domain/user';

interface UpdateUserRequest {
  id: string;
  name?: string;
  email?: string;
  password?: string;
}

@Injectable()
export class UpdateUser {
  constructor(
    private usersRepo: UsersRepository,
    private passwordHasher: PasswordHasher,
  ) {}

  async execute(request: UpdateUserRequest): Promise<void> {
    const { id, email, name, password } = request;

    const user = await this.usersRepo.findOne(id);

    if (!user) throw new NotFoundException('User not found.');

    if (email) {
      const emailInUse = await this.usersRepo.findByEmail(email);

      if (emailInUse && emailInUse.id !== id)
        throw new ConflictException('Email in use.');
    }

    const updatedUser = new User({
      id: user.id,
      name: name ?? user.name,
      email: email ?? user.email,
      password: password
        ? await this.passwordHasher.hash(password)
        : user.password,
    });

    await this.usersRepo.update(id, updatedUser);
  }
}
