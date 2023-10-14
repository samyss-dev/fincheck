import { BankAccountsRepository } from '@app/repositories/bank-accounts-repository';
import { BankAccount } from '@domain/bank-account';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindAllBankAccounts {
  constructor(private bankAccountRepo: BankAccountsRepository) {}

  async execute(userId: string): Promise<BankAccount[]> {
    return this.bankAccountRepo.findAll(userId);
  }
}
