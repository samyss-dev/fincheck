import { BankAccountsRepository } from '@app/repositories/bank-accounts-repository';
import { bankAccountType, BankAccount } from '@domain/bank-account';
import { Injectable } from '@nestjs/common';

interface CreateBankAccountRequest {
  userId: string;
  name: string;
  initialBalance: number;
  type: bankAccountType;
  color: string;
}

@Injectable()
export class CreateBankAccount {
  constructor(private bankAccountsRepo: BankAccountsRepository) {}
  async execute(request: CreateBankAccountRequest): Promise<void> {
    const { userId, name, initialBalance, type, color } = request;

    const bankAccount = new BankAccount({
      userId,
      name,
      initialBalance,
      type,
      color,
    });

    await this.bankAccountsRepo.create(bankAccount);
  }
}
