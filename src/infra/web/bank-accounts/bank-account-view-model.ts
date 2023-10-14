import { BankAccount } from '@domain/bank-account';

export class BankAccountViewModel {
  static toWeb(bankAccount: BankAccount) {
    return {
      name: bankAccount.name,
      initialBalance: bankAccount.initialBalance,
      type: bankAccount.type,
      color: bankAccount.color,
      id: bankAccount.id,
    };
  }
}
