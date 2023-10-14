import { BankAccountsRepository } from '@app/repositories/bank-accounts-repository';
import { InMemoryBankAccountsRepository } from '@test/in-memory/in-memory-bank-account-repository';
import { UpdateBankAccount } from './update-bank-account';
import { BankAccount, bankAccountType } from '@domain/bank-account';
import { NotFoundException } from '@nestjs/common';

describe('UpdateBankAccount', () => {
  let bankAccountRepo: BankAccountsRepository;
  let updateBankAccount: UpdateBankAccount;

  beforeEach(() => {
    bankAccountRepo = new InMemoryBankAccountsRepository();
    updateBankAccount = new UpdateBankAccount(bankAccountRepo);
  });

  const updateBankAccountRequest = {
    userId: '1',
    initialBalance: 4000,
    color: '#4287f5',
  };

  it('should updateBankAccount a bank account', async () => {
    await bankAccountRepo.create(
      new BankAccount({
        id: '1',
        userId: '1',
        name: 'Nubank',
        initialBalance: 2000,
        type: bankAccountType.CHECKING,
        color: '#820ad1',
      }),
    );
    await updateBankAccount.execute('1', updateBankAccountRequest);

    const bankAccount = await bankAccountRepo.findOne('1', '1');

    expect(bankAccount.color).toBe('#820ad1');
    expect(bankAccount.initialBalance).toBe(4000);
  });

  it('should throw NotFoundException if bank account not found', async () => {
    await expect(
      updateBankAccount.execute('1', {
        ...updateBankAccountRequest,
        userId: '2',
      }),
    ).rejects.toThrow(NotFoundException);
  });
});
