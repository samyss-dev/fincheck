import { TransactionsRepository } from '@app/repositories/transactions-repository';
import { Injectable, NotFoundException } from '@nestjs/common';

interface DeleteTransactionRequest {
  id: string;
  userId: string;
}

@Injectable()
export class DeleteTransaction {
  constructor(private transactionsRepo: TransactionsRepository) {}

  async execute(request: DeleteTransactionRequest): Promise<void> {
    const { id, userId } = request;

    const transaction = await this.transactionsRepo.findOne(id, userId);

    if (!transaction) throw new NotFoundException('Transaction not found.');

    await this.transactionsRepo.delete(id);
  }
}
