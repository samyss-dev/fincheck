import { User } from '@domain/user';

export class UserViewModel {
  static toWeb(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
