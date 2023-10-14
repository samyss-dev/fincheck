import { BankAccountsRepository } from '@app/repositories/bank-accounts-repository';
import { BankAccount } from '@domain/bank-account';
import { Injectable, NotFoundException } from '@nestjs/common';

interface FindBankAccountRequest {
  id: string;
  userId: string;
}

@Injectable()
export class FindBankAccount {
  constructor(private bankAccountsRepo: BankAccountsRepository) {}
  async execute(request: FindBankAccountRequest): Promise<BankAccount | null> {
    const { id, userId } = request;

    const bankAccount = await this.bankAccountsRepo.findOne(id, userId);

    if (!bankAccount) throw new NotFoundException('Bank account not found.');

    return bankAccount;
  }
}
