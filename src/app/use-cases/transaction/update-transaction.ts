import { BankAccountsRepository } from '@app/repositories/bank-accounts-repository';
import { CategoriesRepository } from '@app/repositories/categories-repository';
import { TransactionsRepository } from '@app/repositories/transactions-repository';
import { Transaction, transactionType } from '@domain/transaction';
import { Injectable, NotFoundException } from '@nestjs/common';

interface UpdateTransactionRequest {
  userId: string;
  bankAccountId: string;
  categoryId?: string;
  name?: string;
  date?: string;
  type?: transactionType;
  value?: number;
}

@Injectable()
export class UpdateTransaction {
  constructor(
    private transactionsRepo: TransactionsRepository,
    private bankAccountsRepo: BankAccountsRepository,
    private categoriesRepo: CategoriesRepository,
  ) {}
  async execute(id: string, request: UpdateTransactionRequest): Promise<void> {
    const { userId, bankAccountId, categoryId, name, date, type, value } =
      request;

    const transaction = await this.transactionsRepo.findOne(id, userId);

    if (!transaction) throw new NotFoundException('Transaction not found');

    const bankAccount = await this.bankAccountsRepo.findOne(
      bankAccountId,
      userId,
    );

    if (!bankAccount) throw new NotFoundException('Bank account not found');

    if (categoryId) {
      const category = await this.categoriesRepo.findOne(categoryId, userId);

      if (!category) throw new NotFoundException('Category not found');
    }

    const updatedTransaction = new Transaction({
      id: transaction.id,
      userId: transaction.userId,
      bankAccountId: transaction.bankAccountId,
      categoryId: transaction.categoryId,
      name: name ?? transaction.name,
      date: date ? new Date(date) : transaction.date,
      type: type ?? transaction.type,
      value: value ?? transaction.value,
    });

    await this.transactionsRepo.update(id, updatedTransaction);
  }
}
