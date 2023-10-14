import { Module } from '@nestjs/common';
import { BankAccountsService } from './bank-accounts.service';
import { BankAccountsController } from './bank-accounts.controller';
import { CreateBankAccount } from '@app/use-cases/bank-account/create-bank-account';
import { FindAllBankAccounts } from '@app/use-cases/bank-account/find-all-bank-account';
import { FindBankAccount } from '@app/use-cases/bank-account/find-bank-account';
import { UpdateBankAccount } from '@app/use-cases/bank-account/update-bank-account';
import { DeleteBankAccount } from '@app/use-cases/bank-account/delete-bank-account';

@Module({
  controllers: [BankAccountsController],
  providers: [
    BankAccountsService,
    CreateBankAccount,
    FindAllBankAccounts,
    FindBankAccount,
    UpdateBankAccount,
    DeleteBankAccount,
  ],
})
export class BankAccountsModule {}
