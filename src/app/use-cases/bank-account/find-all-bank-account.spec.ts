import { BankAccountsRepository } from '@app/repositories/bank-accounts-repository';
import { FindAllBankAccounts } from './find-all-bank-account';
import { InMemoryBankAccountsRepository } from '@test/in-memory/in-memory-bank-account-repository';
import { BankAccount, bankAccountType } from '@domain/bank-account';

describe('FindAllBankAccounts', () => {
  let bankAccountsRepo: BankAccountsRepository;
  let findAllBankAccounts: FindAllBankAccounts;

  beforeEach(() => {
    bankAccountsRepo = new InMemoryBankAccountsRepository();
    findAllBankAccounts = new FindAllBankAccounts(bankAccountsRepo);
  });

  const bankAccountData = {
    id: '1',
    userId: '1',
    name: 'Nubank',
    initialBalance: 1000,
    type: bankAccountType.CHECKING,
    color: '#820ad1',
  };

  it('should be able to find all existing bank accounts', async () => {
    await bankAccountsRepo.create(new BankAccount(bankAccountData));

    const foundBankAccounts = await findAllBankAccounts.execute(
      bankAccountData.userId,
    );

    expect(foundBankAccounts).toHaveLength(1);
  });

  it('should return an empty list of bank accounts', async () => {
    const foundBankAccounts = await findAllBankAccounts.execute('2');

    expect(foundBankAccounts).toStrictEqual([]);
  });
});
