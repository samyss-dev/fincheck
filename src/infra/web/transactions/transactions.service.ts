import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { FindAllTransactions } from '@app/use-cases/transaction/find-all-transactions';
import { FindTransaction } from '@app/use-cases/transaction/find-transaction';
import { DeleteTransaction } from '@app/use-cases/transaction/delete-transaction';
import { UpdateTransaction } from '@app/use-cases/transaction/update-transaction';
import { CreateTransaction } from '@app/use-cases/transaction/create-transaction';

@Injectable()
export class TransactionsService {
  constructor(
    private create: CreateTransaction,
    private findAll: FindAllTransactions,
    private findOne: FindTransaction,
    private update: UpdateTransaction,
    private remove: DeleteTransaction,
  ) {}
  createService(userId: string, createTransactionDto: CreateTransactionDto) {
    const updatedData = Object.assign(createTransactionDto, { userId });
    return this.create.execute(updatedData);
  }

  async updateService(
    transactionId: string,
    userId: string,
    updateTransactionDto: UpdateTransactionDto,
  ) {
    const updatedData = Object.assign(updateTransactionDto, { userId });

    return await this.update.execute(transactionId, updatedData);
  }

  removeService(transactionId: string, userId: string) {
    return this.remove.execute({ id: transactionId, userId });
  }

  findAllService(userId: string) {
    return this.findAll.execute(userId);
  }

  findOneService(transactionId: string, userId: string) {
    return this.findOne.execute({ id: transactionId, userId });
  }
}
