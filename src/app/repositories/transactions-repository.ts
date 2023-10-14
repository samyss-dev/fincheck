import { Transaction } from '@domain/transaction';

export abstract class TransactionsRepository {
  abstract create(transaction: Transaction): Promise<void>;
  abstract update(id: string, transaction: Transaction): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract findAll(userId: string): Promise<Transaction[]>;
  abstract findOne(id: string, userId: string): Promise<Transaction | null>;
  abstract findByUserId(userId: string): Promise<Transaction | null>;
}
