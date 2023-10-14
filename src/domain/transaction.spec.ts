import { Transaction, transactionType } from './transaction';

describe('Transaction', () => {
  it('should be able to create a transaction', () => {
    const transaction = new Transaction({
      userId: '1',
      bankAccountId: '1',
      name: 'Salary',
      date: new Date('2023,08,28'),
      type: transactionType.INCOME,
      value: 2000,
    });

    expect(transaction).toBeInstanceOf(Transaction);
    expect(transaction).toHaveProperty('id');
    expect(transaction.userId).toBe('1');
    expect(transaction.bankAccountId).toBe('1');
    expect(transaction.name).toBe('Salary');
    expect(transaction.value).toBe(2000);
  });
});
