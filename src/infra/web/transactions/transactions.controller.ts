import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  ParseUUIDPipe,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionViewModel } from './transaction-view-model';
import { ActiveUserId } from '@shared/decorators/ActiveUserId';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  create(
    @ActiveUserId() userId: string,
    @Body() createTransactionDto: CreateTransactionDto,
  ) {
    return this.transactionsService.createService(userId, createTransactionDto);
  }

  @Patch(':transactionId')
  @HttpCode(204)
  update(
    @ActiveUserId() userId: string,
    @Param('transactionId', ParseUUIDPipe) transactionId: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionsService.updateService(
      transactionId,
      userId,
      updateTransactionDto,
    );
  }

  @Delete(':transactionId')
  @HttpCode(204)
  remove(
    @ActiveUserId() userId: string,
    @Param('transactionId', ParseUUIDPipe) transactionId: string,
  ) {
    return this.transactionsService.removeService(transactionId, userId);
  }

  @Get()
  async findAll(@ActiveUserId() userId: string) {
    const transactions = await this.transactionsService.findAllService(userId);

    return transactions.map((transaction) =>
      TransactionViewModel.toWeb(transaction),
    );
  }

  @Get(':transactionId')
  async findOne(
    @ActiveUserId() userId: string,
    @Param('transactionId', ParseUUIDPipe) transactionId: string,
  ) {
    const transaction = await this.transactionsService.findOneService(
      transactionId,
      userId,
    );

    return TransactionViewModel.toWeb(transaction);
  }
}
