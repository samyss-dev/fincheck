import { UsersRepository } from '@app/repositories/users-repository';
import { User } from '@domain/User';
import { Injectable, NotFoundException } from '@nestjs/common';

interface FindUserRequest {
  id: string;
}

@Injectable()
export class FindUser {
  constructor(private usersRepo: UsersRepository) {}

  async execute(request: FindUserRequest): Promise<User | null> {
    const { id } = request;

    const user = await this.usersRepo.findOne(id);

    if (!user) throw new NotFoundException('User not found.');

    return user;
  }
}
