import { BankAccountsRepository } from '@app/repositories/bank-accounts-repository';
import { CreateBankAccount } from './create-bank-account';
import { InMemoryBankAccountsRepository } from '@test/in-memory/in-memory-bank-account-repository';
import { bankAccountType } from '@domain/bank-account';

describe('CreateBankAccount', () => {
  let bankAccountsRepo: BankAccountsRepository;
  let createBankAccount: CreateBankAccount;

  beforeEach(() => {
    bankAccountsRepo = new InMemoryBankAccountsRepository();
    createBankAccount = new CreateBankAccount(bankAccountsRepo);
  });

  const createBankAccountRequest = {
    userId: '1',
    name: 'Nubank',
    initialBalance: 2000,
    type: bankAccountType.CHECKING,
    color: '#820ad1',
  };

  it('should be able to create a new bank account', async () => {
    await createBankAccount.execute(createBankAccountRequest);

    const bankAccount = await bankAccountsRepo.findByUserId('1');

    expect(bankAccount).toHaveProperty('id');
    expect(bankAccount.name).toBe('Nubank');
    expect(bankAccount.initialBalance).toBe(2000);
    expect(bankAccount.type).toBe(bankAccountType.CHECKING);
    expect(bankAccount.color).toBe('#820ad1');
  });
});
