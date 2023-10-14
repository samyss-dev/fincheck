import { Transaction } from '@domain/transaction';

export class TransactionViewModel {
  static toWeb(transaction: Transaction) {
    return {
      id: transaction.id,
      bankAccountId: transaction.bankAccountId,
      categoryId: transaction.categoryId,
      name: transaction.name,
      date: transaction.date.toLocaleDateString('en-GB'),
      type: transaction.type,
      value: transaction.value,
    };
  }
}
