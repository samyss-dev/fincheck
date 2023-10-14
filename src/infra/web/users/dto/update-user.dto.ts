import { SignUpDto } from '@infra/web/auth/dto/sign-up.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserDto extends PartialType(SignUpDto) {}
