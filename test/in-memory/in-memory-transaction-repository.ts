import { TransactionsRepository } from '@app/repositories/transactions-repository';
import { Transaction } from '@domain/transaction';

export class InMemoryTransactionsRepository implements TransactionsRepository {
  private transactions: Transaction[] = [];

  async create(transaction: Transaction): Promise<void> {
    this.transactions.push(transaction);
  }

  async update(id: string, transaction: Transaction): Promise<void> {
    const transactionIndex = this.transactions.findIndex(
      (transaction) => transaction.id === id,
    );

    this.transactions[transactionIndex] = transaction;
  }

  async delete(id: string): Promise<void> {
    this.transactions.filter((transaction) => transaction.id !== id);
  }

  async findAll(userId: string): Promise<Transaction[]> {
    return this.transactions.filter(
      (transaction) => transaction.userId === userId,
    );
  }

  async findByUserId(userId: string): Promise<Transaction | null> {
    const transaction = this.transactions.find(
      (transaction) => transaction.userId === userId,
    );

    if (!transaction) return null;

    return transaction;
  }

  async findOne(id: string, userId: string): Promise<Transaction | null> {
    const transaction = this.transactions.find(
      (transaction) => transaction.id === id && transaction.userId === userId,
    );

    if (!transaction) return null;

    return transaction;
  }
}
