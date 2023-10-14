import { TransactionsRepository } from '@app/repositories/transactions-repository';
import { DeleteTransaction } from './delete-transaction';
import { InMemoryTransactionsRepository } from '@test/in-memory/in-memory-transaction-repository';
import { Transaction, transactionType } from '@domain/transaction';
import { NotFoundException } from '@nestjs/common';

describe('DeleteTransaction', () => {
  let transactionsRepo: TransactionsRepository;
  let deleteTransaction: DeleteTransaction;

  beforeEach(() => {
    transactionsRepo = new InMemoryTransactionsRepository();
    deleteTransaction = new DeleteTransaction(transactionsRepo);
  });

  it('should be able to delete an existing transaction', async () => {
    await transactionsRepo.create(
      new Transaction({
        id: '1',
        userId: '1',
        bankAccountId: '1',
        name: 'Salary',
        date: new Date('2023, 08, 26'),
        type: transactionType.INCOME,
        value: 2000,
      }),
    );

    await deleteTransaction.execute({ id: '1', userId: '1' });

    const transaction = transactionsRepo.findOne('1', '1');

    expect(transaction).toBeNull;
  });

  it('should throw NotFoundException if transaction not found', async () => {
    await expect(() =>
      deleteTransaction.execute({ id: '1', userId: '1' }),
    ).rejects.toThrow(NotFoundException);
  });
});
