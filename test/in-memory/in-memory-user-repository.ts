import { UsersRepository } from '@app/repositories/users-repository';
import { User } from '../../src/domain/user';

export class InMemoryUsersRepository implements UsersRepository {
  private users: User[] = [];

  async create(user: User): Promise<User> {
    this.users.push(user);

    return user;
  }

  async update(id: string, user: User): Promise<void> {
    const userIndex = this.users.findIndex((user) => user.id === id);

    this.users[userIndex] = user;
  }

  async delete(id: string): Promise<void> {
    this.users = this.users.filter((user) => user.id !== id);
  }

  async findOne(id: string): Promise<User> {
    const user = this.users.find((user) => user.id === id);

    if (!user) return null;

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email);

    if (!user) return null;

    return user;
  }
}
