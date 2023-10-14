import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UsersRepository } from '@app/repositories/users-repository';
import { PrismaUsersRepository } from './prisma/repositories/prisma-users-repository';
import { BankAccountsRepository } from '@app/repositories/bank-accounts-repository';
import { TransactionsRepository } from '@app/repositories/transactions-repository';
import { PrismaBankAccountsRepository } from './prisma/repositories/prisma-bank-accounts-repository';
import { PrismaTransactionsRepository } from './prisma/repositories/prisma-transaction-repository';
import { PrismaCategoriesRepository } from './prisma/repositories/prisma-categories-repository';
import { CategoriesRepository } from '@app/repositories/categories-repository';

@Global()
@Module({
  providers: [
    PrismaService,
    { provide: UsersRepository, useClass: PrismaUsersRepository },
    { provide: BankAccountsRepository, useClass: PrismaBankAccountsRepository },
    { provide: TransactionsRepository, useClass: PrismaTransactionsRepository },
    { provide: CategoriesRepository, useClass: PrismaCategoriesRepository },
  ],
  exports: [
    UsersRepository,
    BankAccountsRepository,
    TransactionsRepository,
    CategoriesRepository,
  ],
})
export class DatabaseModule {}
