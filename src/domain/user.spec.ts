import { User } from './User';

describe('User', () => {
  it('should be able to create an user', () => {
    const user = new User({
      name: 'Jhon Doe',
      email: 'jhon@email.com',
      password: 'password',
    });

    expect(user).toBeInstanceOf(User);
    expect(user).toHaveProperty('id');
    expect(user.name).toBe('Jhon Doe');
  });
});
