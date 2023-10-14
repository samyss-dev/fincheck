import { BankAccount, bankAccountType } from '@domain/bank-account';
import { BankAccount as PrismaBankAccount } from '@prisma/client';

export class PrismaBankAccountMapper {
  static toPrisma(bankAccount: BankAccount) {
    return {
      userId: bankAccount.userId,
      name: bankAccount.name,
      initialBalance: bankAccount.initialBalance,
      type: bankAccount.type,
      color: bankAccount.color,
    };
  }

  static toDomain(bankAccount: PrismaBankAccount) {
    return new BankAccount({
      id: bankAccount.id,
      userId: bankAccount.userId,
      name: bankAccount.name,
      initialBalance: bankAccount.initialBalance.toNumber(),
      type: bankAccountType[bankAccount.type as keyof typeof bankAccountType],
      color: bankAccount.color,
    });
  }
}
