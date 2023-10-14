import { TransactionsRepository } from '@app/repositories/transactions-repository';
import { UpdateTransaction } from './update-transaction';
import { InMemoryTransactionsRepository } from '@test/in-memory/in-memory-transaction-repository';
import { Transaction, transactionType } from '@domain/transaction';
import { NotFoundException } from '@nestjs/common';
import { InMemoryBankAccountsRepository } from '@test/in-memory/in-memory-bank-account-repository';
import { BankAccountsRepository } from '@app/repositories/bank-accounts-repository';
import { CategoriesRepository } from '@app/repositories/categories-repository';
import { InMemoryCategoriesRepository } from '@test/in-memory/in-memory-category-repository';
import { BankAccount, bankAccountType } from '@domain/bank-account';
import { Category } from '@domain/category';

describe('UpdateTransaction', () => {
  let transactionsRepo: TransactionsRepository;
  let bankAccountRepo: BankAccountsRepository;
  let categoriesRepo: CategoriesRepository;
  let updateTransaction: UpdateTransaction;

  beforeEach(() => {
    transactionsRepo = new InMemoryTransactionsRepository();
    bankAccountRepo = new InMemoryBankAccountsRepository();
    categoriesRepo = new InMemoryCategoriesRepository();
    updateTransaction = new UpdateTransaction(
      transactionsRepo,
      bankAccountRepo,
      categoriesRepo,
    );
  });

  const updateTransactionRequest = {
    userId: '1',
    bankAccountId: '1',
    categoryId: '1',
    name: 'Gym',
    type: transactionType.EXPENSE,
    value: 1000,
  };

  const bankAccountData = {
    id: '1',
    userId: '1',
    name: 'Nubank',
    initialBalance: 2000,
    type: bankAccountType.CHECKING,
    color: 'PURPLE',
  };

  const transactionData = {
    id: '1',
    userId: '1',
    bankAccountId: '1',
    categoryId: '1',
    name: 'Salary',
    date: new Date('2023,08,25'),
    type: transactionType.INCOME,
    value: 2000,
  };

  it('should be able to update an account', async () => {
    await bankAccountRepo.create(new BankAccount({ ...bankAccountData }));

    await categoriesRepo.create(
      new Category({
        id: '1',
        userId: '1',
        name: 'real name',
        icon: 'real icon',
        type: transactionType.EXPENSE,
      }),
    );

    await transactionsRepo.create(
      new Transaction({
        ...transactionData,
      }),
    );
    await updateTransaction.execute('1', updateTransactionRequest);

    const transaction = await transactionsRepo.findOne('1', '1');

    expect(transaction.name).toBe('Gym');
    expect(transaction.type).toBe(transactionType.EXPENSE);
    expect(transaction.value).toBe(1000);
  });

  it('should throw NotFoundException if transaction not found', async () => {
    await expect(() =>
      updateTransaction.execute('1', updateTransactionRequest),
    ).rejects.toThrow(NotFoundException);
  });

  it('should throw NotFoundException if bank account not found', async () => {
    await transactionsRepo.create(
      new Transaction({
        ...transactionData,
      }),
    );
    await expect(() =>
      updateTransaction.execute('1', updateTransactionRequest),
    ).rejects.toThrow(NotFoundException);
  });

  it('should throw NotFoundException if category not found', async () => {
    await bankAccountRepo.create(
      new BankAccount({
        ...bankAccountData,
      }),
    );

    await transactionsRepo.create(
      new Transaction({
        ...transactionData,
      }),
    );
    await expect(() =>
      updateTransaction.execute('1', updateTransactionRequest),
    ).rejects.toThrow(NotFoundException);
  });
});
