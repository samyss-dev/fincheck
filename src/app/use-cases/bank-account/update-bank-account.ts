import { BankAccountsRepository } from '@app/repositories/bank-accounts-repository';
import { BankAccount, bankAccountType } from '@domain/bank-account';
import { Injectable, NotFoundException } from '@nestjs/common';

interface UpdateBankAccountRequest {
  userId: string;
  name?: string;
  initialBalance?: number;
  type?: bankAccountType;
  color?: string;
}

@Injectable()
export class UpdateBankAccount {
  constructor(private bankAccountsRepo: BankAccountsRepository) {}
  async execute(id: string, request: UpdateBankAccountRequest): Promise<void> {
    const { userId, name, initialBalance, type, color } = request;

    const bankAccount = await this.bankAccountsRepo.findOne(id, userId);

    if (!bankAccount) throw new NotFoundException('Bank account not found.');

    const updatedBankAccount = new BankAccount({
      id: bankAccount.id,
      userId: bankAccount.userId,
      name: name ?? bankAccount.name,
      initialBalance: initialBalance ?? bankAccount.initialBalance,
      type: type ?? bankAccount.type,
      color: color ?? bankAccount.color,
    });

    await this.bankAccountsRepo.update(id, updatedBankAccount);
  }
}
