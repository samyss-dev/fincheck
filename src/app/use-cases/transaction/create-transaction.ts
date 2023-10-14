import { BankAccountsRepository } from '@app/repositories/bank-accounts-repository';
import { CategoriesRepository } from '@app/repositories/categories-repository';
import { TransactionsRepository } from '@app/repositories/transactions-repository';
import { Transaction, transactionType } from '@domain/transaction';
import { Injectable, NotFoundException } from '@nestjs/common';

interface CreateTransactionRequest {
  userId: string;
  bankAccountId: string;
  categoryId?: string;
  name: string;
  date: string;
  type: transactionType;
  value: number;
}

@Injectable()
export class CreateTransaction {
  constructor(
    private transactionsRepo: TransactionsRepository,
    private bankAccountsRepo: BankAccountsRepository,
    private categoryRepo: CategoriesRepository,
  ) {}
  async execute(request: CreateTransactionRequest): Promise<void> {
    const { userId, bankAccountId, categoryId, name, date, type, value } =
      request;

    const bankAccount = await this.bankAccountsRepo.findOne(
      bankAccountId,
      userId,
    );

    if (!bankAccount) throw new NotFoundException('Bank account not found.');

    if (categoryId) {
      const category = await this.categoryRepo.findOne(categoryId, userId);

      if (!category) throw new NotFoundException('Category not found.');
    }

    const transaction = new Transaction({
      userId,
      bankAccountId,
      categoryId,
      name,
      date: new Date(date),
      type,
      value,
    });

    await this.transactionsRepo.create(transaction);
  }
}
