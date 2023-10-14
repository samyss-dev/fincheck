import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { CreateTransaction } from '@app/use-cases/transaction/create-transaction';
import { FindAllTransactions } from '@app/use-cases/transaction/find-all-transactions';
import { FindTransaction } from '@app/use-cases/transaction/find-transaction';
import { UpdateTransaction } from '@app/use-cases/transaction/update-transaction';
import { DeleteTransaction } from '@app/use-cases/transaction/delete-transaction';

@Module({
  controllers: [TransactionsController],
  providers: [
    TransactionsService,
    CreateTransaction,
    UpdateTransaction,
    DeleteTransaction,
    FindAllTransactions,
    FindTransaction,
  ],
})
export class TransactionsModule {}
