import { UsersRepository } from '@app/repositories/users-repository';
import { SignIn } from './sign-in';
import { InMemoryUsersRepository } from '@test/in-memory/in-memory-user-repository';
import { AuthService } from '@app/providers/auth-service';
import { InMemoryAuthService } from '@test/in-memory/in-memory-auth-service';
import { PasswordHasher } from '@app/providers/password-hasher';
import { InMemoryPasswordHasher } from '@test/in-memory/in-memory-password-hasher';
import { User } from '@domain/user';
import { UnauthorizedException } from '@nestjs/common';

describe('SignIn', () => {
  let usersRepo: UsersRepository;
  let authService: AuthService;
  let passwordHasher: PasswordHasher;
  let signIn: SignIn;

  beforeEach(() => {
    usersRepo = new InMemoryUsersRepository();
    passwordHasher = new InMemoryPasswordHasher();
    authService = new InMemoryAuthService();
    signIn = new SignIn(usersRepo, passwordHasher, authService);
  });

  const userData = {
    id: '1',
    name: 'Jhon',
    email: 'email@email.com',
    password: 'hashed_P@ssw0rd',
  };

  const signInRequest = {
    email: 'email@email.com',
    password: 'P@ssw0rd',
  };

  it('should sign in successfully', async () => {
    await usersRepo.create(new User(userData));

    await expect(signIn.execute(signInRequest)).resolves.toBe('token_1');
  });

  it('should throw UnauthorizedException if email is not valid', async () => {
    await expect(() => signIn.execute(signInRequest)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should throw UnauthorizedException if password is not valid', async () => {
    await usersRepo.create(new User(userData));

    await expect(() =>
      signIn.execute({ ...signInRequest, password: 'FalsePassword' }),
    ).rejects.toThrow(UnauthorizedException);
  });
});
