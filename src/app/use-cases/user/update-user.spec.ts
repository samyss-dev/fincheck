import { InMemoryUsersRepository } from '@test/in-memory/in-memory-user-repository';
import { PasswordHasher } from '@app/providers/password-hasher';
import { UsersRepository } from '@app/repositories/users-repository';
import { UpdateUser } from '@app/use-cases/user/update-user';
import { InMemoryPasswordHasher } from '@test/in-memory/in-memory-password-hasher';
import { User } from '@domain/User';
import { ConflictException, NotFoundException } from '@nestjs/common';

describe('UpdateUser', () => {
  let usersRepo: UsersRepository;
  let passwordHasher: PasswordHasher;
  let updateUser: UpdateUser;

  beforeEach(() => {
    (usersRepo = new InMemoryUsersRepository()),
      (passwordHasher = new InMemoryPasswordHasher()),
      (updateUser = new UpdateUser(usersRepo, passwordHasher));
  });

  const updateUserRequest = {
    id: '1',
    name: 'Samuel Souza',
    email: 'email@email.com',
    password: 'P@ssw0rd',
  };

  it('should update an user', async () => {
    await usersRepo.create(
      new User({
        id: '1',
        name: 'John Doe',
        email: 'email@email.com',
        password: 'password',
      }),
    );

    await updateUser.execute(updateUserRequest);

    const user = await usersRepo.findOne('1');

    const isPasswordValid = await passwordHasher.compare(
      updateUserRequest.password,
      user.password,
    );

    expect(user.name).toBe(updateUserRequest.name);
    expect(user.email).toBe(updateUserRequest.email);
    expect(isPasswordValid).toBe(true);
  });

  it('should throw UserNotFound if user not found', async () => {
    await expect(() => updateUser.execute(updateUserRequest)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should throw EmailInUse if email in use', async () => {
    await usersRepo.create(
      new User({
        id: '1',
        name: 'Jane Doe',
        email: 'jane@email.com',
        password: 'password',
      }),
    );

    await usersRepo.create(
      new User({
        id: '2',
        name: 'Jhon Doe',
        email: 'email@email.com',
        password: 'password',
      }),
    );

    await expect(() => updateUser.execute(updateUserRequest)).rejects.toThrow(
      ConflictException,
    );
  });
});
