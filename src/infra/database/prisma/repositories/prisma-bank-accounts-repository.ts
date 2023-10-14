import { BankAccountsRepository } from '@app/repositories/bank-accounts-repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { BankAccount } from '@domain/bank-account';
import { PrismaBankAccountMapper } from '../mappers/prisma-bank-account-mapper';

@Injectable()
export class PrismaBankAccountsRepository implements BankAccountsRepository {
  constructor(private prisma: PrismaService) {}

  async create(bankAccount: BankAccount): Promise<BankAccount> {
    const data = PrismaBankAccountMapper.toPrisma(bankAccount);

    const createdBankAccount = await this.prisma.bankAccount.create({ data });

    return PrismaBankAccountMapper.toDomain(createdBankAccount);
  }

  async update(id: string, bankAccount: BankAccount): Promise<void> {
    const data = PrismaBankAccountMapper.toPrisma(bankAccount);

    await this.prisma.bankAccount.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.bankAccount.delete({ where: { id } });
  }

  async findAll(userId: string): Promise<BankAccount[]> {
    const bankAccounts = await this.prisma.bankAccount.findMany({
      where: { userId },
    });

    return bankAccounts.map((transaction) =>
      PrismaBankAccountMapper.toDomain(transaction),
    );
  }

  async findOne(id: string, userId: string): Promise<BankAccount | null> {
    const bankAccount = await this.prisma.bankAccount.findUnique({
      where: { id, userId },
    });

    return bankAccount ? PrismaBankAccountMapper.toDomain(bankAccount) : null;
  }

  async findByUserId(userId: string): Promise<BankAccount | null> {
    const bankAccount = await this.prisma.bankAccount.findFirst({
      where: { userId },
    });

    return bankAccount ? PrismaBankAccountMapper.toDomain(bankAccount) : null;
  }
}
