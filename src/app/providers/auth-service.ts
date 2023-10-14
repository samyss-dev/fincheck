export abstract class AuthService {
  abstract generateAccessToken(userId: string): Promise<string>;
}
