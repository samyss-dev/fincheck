import { TransactionsRepository } from '@app/repositories/transactions-repository';
import { Transaction } from '@domain/transaction';
import { Injectable, NotFoundException } from '@nestjs/common';

interface FindTransactionRequest {
  id: string;
  userId: string;
}

@Injectable()
export class FindTransaction {
  constructor(private transactionsRepo: TransactionsRepository) {}

  async execute(request: FindTransactionRequest): Promise<Transaction | null> {
    const { id, userId } = request;

    const transaction = await this.transactionsRepo.findOne(id, userId);

    if (!transaction) throw new NotFoundException('Transaction not found.');

    return transaction;
  }
}
