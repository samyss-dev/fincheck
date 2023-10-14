import { SignIn } from '@app/use-cases/auth/sign-in';
import { SignUp } from '@app/use-cases/auth/sign-up';
import { Injectable } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(private signIn: SignIn, private signUp: SignUp) {}

  async signInService(signInDto: SignInDto) {
    const accessToken = await this.signIn.execute(signInDto);

    return { accessToken };
  }

  async signUpService(signUpDto: SignUpDto) {
    const accessToken = await this.signUp.execute(signUpDto);

    return { accessToken };
  }
}
