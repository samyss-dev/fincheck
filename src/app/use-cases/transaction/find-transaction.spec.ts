import { TransactionsRepository } from '@app/repositories/transactions-repository';
import { InMemoryTransactionsRepository } from '@test/in-memory/in-memory-transaction-repository';
import { FindTransaction } from './find-transaction';
import { Transaction, transactionType } from '@domain/transaction';
import { NotFoundException } from '@nestjs/common';

describe('FindTransaction', () => {
  let transactionsRepo: TransactionsRepository;
  let findTransaction: FindTransaction;

  beforeEach(() => {
    transactionsRepo = new InMemoryTransactionsRepository();
    findTransaction = new FindTransaction(transactionsRepo);
  });

  const transactionData = {
    id: '1',
    userId: '1',
    bankAccountId: '1',
    name: 'Salary',
    date: new Date('2023,08,25'),
    type: transactionType.INCOME,
    value: 2000,
  };

  it('should be able to find one existing transaction', async () => {
    await transactionsRepo.create(new Transaction(transactionData));

    const foundTransaction = await findTransaction.execute({
      id: '1',
      userId: '1',
    });

    expect(foundTransaction).toEqual(new Transaction(transactionData));
  });

  it('should throw NotFoundException if no transaction found', async () => {
    await expect(
      findTransaction.execute({ id: '1', userId: '1' }),
    ).rejects.toThrow(NotFoundException);
  });
});
