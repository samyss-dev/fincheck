import { UsersRepository } from '@app/repositories/users-repository';
import { Injectable, NotFoundException } from '@nestjs/common';

interface DeleteUserRequest {
  id: string;
}

@Injectable()
export class DeleteUser {
  constructor(private usersRepo: UsersRepository) {}

  async execute(request: DeleteUserRequest): Promise<void> {
    const { id } = request;

    const user = await this.usersRepo.findOne(id);

    if (!user) throw new NotFoundException('User not found.');

    await this.usersRepo.delete(id);
  }
}
