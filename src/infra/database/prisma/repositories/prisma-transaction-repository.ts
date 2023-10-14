import { TransactionsRepository } from '@app/repositories/transactions-repository';
import { PrismaService } from '../prisma.service';
import { Transaction } from '@domain/transaction';
import { PrismaTransactionMapper } from '../mappers/prisma-transaction-mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaTransactionsRepository implements TransactionsRepository {
  constructor(private prisma: PrismaService) {}

  async create(transaction: Transaction): Promise<void> {
    const data = PrismaTransactionMapper.toPrisma(transaction);

    await this.prisma.transaction.create({ data });
  }

  async update(id: string, transaction: Transaction): Promise<void> {
    const data = PrismaTransactionMapper.toPrisma(transaction);

    await this.prisma.transaction.update({ where: { id }, data });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.transaction.delete({ where: { id } });
  }

  async findAll(userId: string): Promise<Transaction[]> {
    const transactions = await this.prisma.transaction.findMany({
      where: { userId },
    });

    return transactions.map((transaction) =>
      PrismaTransactionMapper.toDomain(transaction),
    );
  }
  async findByUserId(userId: string): Promise<Transaction | null> {
    const transaction = await this.prisma.transaction.findFirst({
      where: { userId },
    });

    return transaction ? PrismaTransactionMapper.toDomain(transaction) : null;
  }

  async findOne(id: string, userId: string): Promise<Transaction | null> {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id, userId },
    });

    return transaction ? PrismaTransactionMapper.toDomain(transaction) : null;
  }
}
