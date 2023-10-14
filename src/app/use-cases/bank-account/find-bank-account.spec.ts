import { BankAccountsRepository } from '@app/repositories/bank-accounts-repository';
import { FindBankAccount } from './find-bank-account';
import { InMemoryBankAccountsRepository } from '@test/in-memory/in-memory-bank-account-repository';
import { BankAccount, bankAccountType } from '@domain/bank-account';
import { NotFoundException } from '@nestjs/common';

describe('FindBankAccount', () => {
  let bankAccountsRepo: BankAccountsRepository;
  let findBankAccount: FindBankAccount;

  beforeEach(() => {
    bankAccountsRepo = new InMemoryBankAccountsRepository();
    findBankAccount = new FindBankAccount(bankAccountsRepo);
  });

  const bankAccountData = {
    id: '1',
    userId: '1',
    name: 'Nubank',
    initialBalance: 2000,
    type: bankAccountType.CHECKING,
    color: '#820ad1',
  };

  it('should be able to find one existing bank account', async () => {
    await bankAccountsRepo.create(new BankAccount(bankAccountData));

    const foundBankAccount = await findBankAccount.execute({
      id: '1',
      userId: '1',
    });

    expect(foundBankAccount).toEqual(new BankAccount(bankAccountData));
  });

  it('should throw NotFoundException if bank account not found', async () => {
    await expect(() =>
      findBankAccount.execute({ id: '1', userId: '1' }),
    ).rejects.toThrow(NotFoundException);
  });
});
