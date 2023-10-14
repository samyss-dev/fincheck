import { bankAccountType } from '@domain/bank-account';
import {
  IsEnum,
  IsHexColor,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateBankAccountDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  initialBalance: number;

  @IsNotEmpty()
  @IsEnum(bankAccountType)
  type: bankAccountType;

  @IsString()
  @IsHexColor()
  @IsNotEmpty()
  color: string;
}
