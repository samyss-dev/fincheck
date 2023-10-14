import { TransactionsRepository } from '@app/repositories/transactions-repository';
import { InMemoryTransactionsRepository } from '@test/in-memory/in-memory-transaction-repository';
import { FindAllTransactions } from './find-all-transactions';
import { Transaction, transactionType } from '@domain/transaction';

describe('FindAllTransactions', () => {
  let transactionsRepo: TransactionsRepository;
  let findAllTransaction: FindAllTransactions;

  beforeEach(() => {
    transactionsRepo = new InMemoryTransactionsRepository();
    findAllTransaction = new FindAllTransactions(transactionsRepo);
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

  it('should be able to find all existing transactions', async () => {
    await transactionsRepo.create(new Transaction(transactionData));

    const foundTransactions = await findAllTransaction.execute('1');

    expect(foundTransactions).toHaveLength(1);
  });

  it('should return an empty list of transactions', async () => {
    const foundTransactions = await findAllTransaction.execute('');

    expect(foundTransactions).toStrictEqual([]);
  });
});
