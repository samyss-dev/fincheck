import { TransactionsRepository } from '@app/repositories/transactions-repository';
import { CreateTransaction } from './create-transaction';
import { InMemoryTransactionsRepository } from '@test/in-memory/in-memory-transaction-repository';
import { transactionType } from '@domain/transaction';
import { BankAccountsRepository } from '@app/repositories/bank-accounts-repository';
import { InMemoryBankAccountsRepository } from '@test/in-memory/in-memory-bank-account-repository';
import { NotFoundException } from '@nestjs/common';
import { BankAccount, bankAccountType } from '@domain/bank-account';
import { CategoriesRepository } from '@app/repositories/categories-repository';
import { InMemoryCategoriesRepository } from '@test/in-memory/in-memory-category-repository';
import { Category } from '@domain/category';

describe('CreateTransaction', () => {
  let transactionsRepo: TransactionsRepository;
  let bankAccountsRepo: BankAccountsRepository;
  let categoriesRepo: CategoriesRepository;
  let createTransaction: CreateTransaction;

  beforeEach(() => {
    transactionsRepo = new InMemoryTransactionsRepository();
    bankAccountsRepo = new InMemoryBankAccountsRepository();
    categoriesRepo = new InMemoryCategoriesRepository();
    createTransaction = new CreateTransaction(
      transactionsRepo,
      bankAccountsRepo,
      categoriesRepo,
    );
  });

  const createTransactionRequest = {
    userId: '1',
    bankAccountId: '1',
    categoryId: '1',
    name: 'Course',
    date: '2023,04,30',
    type: transactionType.EXPENSE,
    value: 2000,
  };

  it('should be able to create a transaction', async () => {
    await bankAccountsRepo.create(
      new BankAccount({
        id: '1',
        userId: '1',
        initialBalance: 1000,
        name: 'Nubank',
        color: '#820ad1',
        type: bankAccountType.CHECKING,
      }),
    );

    await categoriesRepo.create(
      new Category({
        id: '1',
        userId: '1',
        name: 'Random name',
        icon: 'Random icon',
        type: transactionType.EXPENSE,
      }),
    );

    await createTransaction.execute(createTransactionRequest);

    const foundTransaction = await transactionsRepo.findByUserId('1');

    expect(foundTransaction.name).toBe('Course');
    expect(foundTransaction.type).toBe(transactionType.EXPENSE);
    expect(foundTransaction.value).toBe(2000);
  });

  it('should throw NotFoundException if bank account not found', async () => {
    await expect(
      createTransaction.execute(createTransactionRequest),
    ).rejects.toThrow(NotFoundException);
  });

  it('should throw NotFoundException if categories not found', async () => {
    await bankAccountsRepo.create(
      new BankAccount({
        id: '1',
        userId: '1',
        initialBalance: 1000,
        name: 'Nubank',
        color: '#820ad1',
        type: bankAccountType.CHECKING,
      }),
    );

    await expect(
      createTransaction.execute({
        ...createTransactionRequest,
        categoryId: '1',
      }),
    ).rejects.toThrow(NotFoundException);

    console.log(createTransactionRequest);
  });
});
