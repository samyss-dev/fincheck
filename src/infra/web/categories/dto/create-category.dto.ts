import { transactionType } from '@domain/transaction';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  icon: string;

  @IsNotEmpty()
  @IsEnum(transactionType)
  type: transactionType;
}
