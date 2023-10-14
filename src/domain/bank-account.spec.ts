import { BankAccount, bankAccountType } from './bank-account';

describe('Bank Account', () => {
  it('should be able to create a bank account', () => {
    const bankAccount = new BankAccount({
      userId: '1',
      name: 'Nubank',
      initialBalance: 2080,
      type: bankAccountType.CHECKING,
      color: 'YELLOW',
    });

    expect(bankAccount).toBeInstanceOf(BankAccount);
    expect(bankAccount).toHaveProperty('id');
    expect(bankAccount.type).toBe(bankAccountType.CHECKING);
    expect(bankAccount.name).toBe('Nubank');
    expect(bankAccount.color).toBe('YELLOW');
  });
});
