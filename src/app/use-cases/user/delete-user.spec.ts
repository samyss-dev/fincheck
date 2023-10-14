import { UsersRepository } from '@app/repositories/users-repository';
import { DeleteUser } from './delete-user';
import { InMemoryUsersRepository } from '@test/in-memory/in-memory-user-repository';
import { User } from '@domain/User';
import { NotFoundException } from '@nestjs/common';

describe('DeleteUser', () => {
  let usersRepo: UsersRepository;
  let deleteUser: DeleteUser;

  beforeEach(() => {
    usersRepo = new InMemoryUsersRepository();
    deleteUser = new DeleteUser(usersRepo);
  });

  it('should be able to delete an existing user', async () => {
    await usersRepo.create(
      new User({
        id: '1',
        name: 'Jhon Doe',
        email: 'email@email.com',
        password: 'password',
      }),
    );

    await deleteUser.execute({ id: '1' });

    const user = await usersRepo.findOne('1');

    expect(user).toBeNull;
  });
  it('should throw UserNotFound if user not found', async () => {
    await expect(() => deleteUser.execute({ id: '1' })).rejects.toThrow(
      NotFoundException,
    );
  });
});
