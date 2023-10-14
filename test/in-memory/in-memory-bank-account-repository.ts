import { BankAccountsRepository } from '@app/repositories/bank-accounts-repository';
import { BankAccount } from '@domain/bank-account';

export class InMemoryBankAccountsRepository implements BankAccountsRepository {
  private bankAccounts: BankAccount[] = [];

  async create(bankAccount: BankAccount): Promise<BankAccount> {
    this.bankAccounts.push(bankAccount);

    return bankAccount;
  }

  async update(id: string, bankAccount: BankAccount): Promise<void> {
    const bankAccountIndex = this.bankAccounts.findIndex(
      (bankAccount) => bankAccount.id === id,
    );

    this.bankAccounts[bankAccountIndex] = bankAccount;
  }

  async delete(id: string): Promise<void> {
    this.bankAccounts.filter((bankAccount) => bankAccount.id !== id);
  }

  async findAll() {
    return this.bankAccounts;
  }

  async findOne(id: string, userId: string): Promise<BankAccount | null> {
    const bankAccount = this.bankAccounts.find(
      (bankAccount) => bankAccount.id === id && bankAccount.userId === userId,
    );

    if (!bankAccount) return null;

    return bankAccount;
  }

  async findByUserId(userId: string): Promise<BankAccount | null> {
    const bankAccount = this.bankAccounts.find(
      (bankAccount) => bankAccount.userId === userId,
    );

    if (!bankAccount) return null;

    return bankAccount;
  }
}
