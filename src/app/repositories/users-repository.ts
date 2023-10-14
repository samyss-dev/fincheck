import { User } from 'src/domain/user';

export abstract class UsersRepository {
  abstract create(user: User): Promise<User>;
  abstract update(id: string, user: User): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract findOne(id: string): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
}
