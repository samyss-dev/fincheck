import { UsersRepository } from '@app/repositories/users-repository';
import { FindUser } from './find-user';
import { InMemoryUsersRepository } from '@test/in-memory/in-memory-user-repository';
import { User } from '@domain/User';
import { NotFoundException } from '@nestjs/common';

describe('FindUser', () => {
  let usersRepo: UsersRepository;
  let findUser: FindUser;

  beforeEach(() => {
    usersRepo = new InMemoryUsersRepository();
    findUser = new FindUser(usersRepo);
  });

  const userData = {
    id: '1',
    name: 'Jhon Doe',
    email: 'email@email.com',
    password: 'password',
  };

  it('should be able to find one existing user', async () => {
    await usersRepo.create(new User(userData));

    const foundUser = await findUser.execute({ id: '1' });

    expect(foundUser).toEqual(new User(userData));
  });

  it('should throw NotFoundException if user not found.', async () => {
    await expect(() => findUser.execute({ id: '1' })).rejects.toThrow(
      NotFoundException,
    );
  });
});
