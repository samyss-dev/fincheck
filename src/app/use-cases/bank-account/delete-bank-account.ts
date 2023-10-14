import { BankAccountsRepository } from '@app/repositories/bank-accounts-repository';
import { Injectable, NotFoundException } from '@nestjs/common';

interface DeleteBankAccountRequest {
  id: string;
  userId: string;
}

@Injectable()
export class DeleteBankAccount {
  constructor(private bankAccountsRepo: BankAccountsRepository) {}

  async execute(request: DeleteBankAccountRequest): Promise<void> {
    const { id, userId } = request;

    const bankAccount = await this.bankAccountsRepo.findOne(id, userId);

    if (!bankAccount) throw new NotFoundException('Bank account not found.');

    await this.bankAccountsRepo.delete(id);
  }
}
