import { BankAccountsRepository } from '@app/repositories/bank-accounts-repository';
import { DeleteBankAccount } from './delete-bank-account';
import { InMemoryBankAccountsRepository } from '@test/in-memory/in-memory-bank-account-repository';
import { BankAccount, bankAccountType } from '@domain/bank-account';
import { NotFoundException } from '@nestjs/common';

describe('DeleteBankAccount', () => {
  let bankAccountsRepo: BankAccountsRepository;
  let deleteBankAccount: DeleteBankAccount;

  beforeEach(() => {
    bankAccountsRepo = new InMemoryBankAccountsRepository();
    deleteBankAccount = new DeleteBankAccount(bankAccountsRepo);
  });

  it('should be able to delete an existing bank account', async () => {
    await bankAccountsRepo.create(
      new BankAccount({
        id: '1',
        userId: '1',
        name: 'Nubank',
        initialBalance: 4000,
        type: bankAccountType.CHECKING,
        color: '#820ad1',
      }),
    );

    await deleteBankAccount.execute({ id: '1', userId: '1' });

    const bankAccount = bankAccountsRepo.findOne('1', '1');

    expect(bankAccount).toBeNull;
  });
  it('should throw NotFoundException if bank account not found', async () => {
    await expect(() =>
      deleteBankAccount.execute({ id: '1', userId: '1' }),
    ).rejects.toThrow(NotFoundException);
  });
});
