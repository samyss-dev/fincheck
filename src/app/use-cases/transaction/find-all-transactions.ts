import { TransactionsRepository } from '@app/repositories/transactions-repository';
import { Transaction } from '@domain/transaction';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindAllTransactions {
  constructor(private transactionsRepo: TransactionsRepository) {}

  async execute(userId: string): Promise<Transaction[]> {
    return await this.transactionsRepo.findAll(userId);
  }
}
