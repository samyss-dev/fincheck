import { BankAccount } from '@domain/bank-account';

export abstract class BankAccountsRepository {
  abstract create(bankAccount: BankAccount): Promise<BankAccount>;
  abstract update(id: string, bankAccount: BankAccount): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract findAll(userId: string): Promise<BankAccount[]>;
  abstract findOne(id: string, userId: string): Promise<BankAccount | null>;
  abstract findByUserId(userId: string): Promise<BankAccount | null>;
}
