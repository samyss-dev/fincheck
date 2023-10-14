import { PasswordHasher } from '@app/providers/password-hasher';
import { UsersRepository } from '@app/repositories/users-repository';
import { SignUp } from '@app/use-cases/auth/sign-up';
import { InMemoryUsersRepository } from '@test/in-memory/in-memory-user-repository';
import { InMemoryPasswordHasher } from '@test/in-memory/in-memory-password-hasher';
import { ConflictException } from '@nestjs/common';
import { AuthService } from '@app/providers/auth-service';
import { InMemoryAuthService } from '@test/in-memory/in-memory-auth-service';

describe('SignUp', () => {
  let usersRepo: UsersRepository;
  let passwordHasher: PasswordHasher;
  let authService: AuthService;
  let signUp: SignUp;

  beforeEach(() => {
    usersRepo = new InMemoryUsersRepository();
    passwordHasher = new InMemoryPasswordHasher();
    authService = new InMemoryAuthService();
    signUp = new SignUp(usersRepo, passwordHasher, authService);
  });

  const signUpRequest = {
    name: 'Jhon Doe',
    email: 'email@hotmail.com',
    password: 'password',
  };

  it('should sign up successfully', async () => {
    const acessToken = await signUp.execute(signUpRequest);

    const user = await usersRepo.findByEmail(signUpRequest.email);

    expect(acessToken).toBe(`token_${user.id}`);
    expect(user.name).toBe(signUpRequest.name);
    expect(user).toHaveProperty('id');
    expect(user.password).toBe(`hashed_${signUpRequest.password}`);
  });

  it('should throw EmailInUse if email is already in use', async () => {
    await signUp.execute(signUpRequest);

    await expect(() =>
      signUp.execute({ ...signUpRequest, name: '_jhondoe' }),
    ).rejects.toThrow(ConflictException);
  });
});
