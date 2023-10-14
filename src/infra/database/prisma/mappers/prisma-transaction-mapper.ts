import { Transaction, transactionType } from '@domain/transaction';
import { Transaction as PrismaTransaction } from '@prisma/client';

export class PrismaTransactionMapper {
  static toPrisma(transaction: Transaction) {
    return {
      userId: transaction.userId,
      bankAccountId: transaction.bankAccountId,
      categoryId: transaction.categoryId,
      name: transaction.name,
      date: transaction.date,
      type: transaction.type,
      value: transaction.value,
    };
  }

  static toDomain(transaction: PrismaTransaction) {
    return new Transaction({
      id: transaction.id,
      userId: transaction.userId,
      bankAccountId: transaction.bankAccountId,
      categoryId: transaction.categoryId,
      name: transaction.name,
      date: transaction.date,
      type: transactionType[transaction.type as keyof typeof transactionType],
      value: Number(transaction.value),
    });
  }
}
