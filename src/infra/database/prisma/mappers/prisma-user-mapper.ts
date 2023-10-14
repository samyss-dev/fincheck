import { User } from '@domain/User';
import { User as PrismaUser } from '@prisma/client';

export class PrismaUserMapper {
  static toPrisma(user: User) {
    return {
      name: user.name,
      email: user.email,
      password: user.password,
    };
  }

  static toDomain(user: PrismaUser) {
    return new User({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    });
  }
}
