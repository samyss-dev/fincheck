import { Injectable } from '@nestjs/common';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';
import { CreateBankAccount } from '@app/use-cases/bank-account/create-bank-account';
import { FindAllBankAccounts } from '@app/use-cases/bank-account/find-all-bank-account';
import { FindBankAccount } from '@app/use-cases/bank-account/find-bank-account';
import { UpdateBankAccount } from '@app/use-cases/bank-account/update-bank-account';
import { DeleteBankAccount } from '@app/use-cases/bank-account/delete-bank-account';

@Injectable()
export class BankAccountsService {
  constructor(
    private create: CreateBankAccount,
    private findAll: FindAllBankAccounts,
    private findOne: FindBankAccount,
    private update: UpdateBankAccount,
    private remove: DeleteBankAccount,
  ) {}

  async createService(
    userId: string,
    createBankAccountDto: CreateBankAccountDto,
  ) {
    const updatedData = Object.assign(createBankAccountDto, { userId });
    return await this.create.execute(updatedData);
  }

  async updateService(
    bankAccountId: string,
    userId: string,
    updateBankAccountDto: UpdateBankAccountDto,
  ) {
    const updatedData = Object.assign(updateBankAccountDto, {
      userId,
    });
    return await this.update.execute(bankAccountId, updatedData);
  }

  async removeService(bankAccountId: string, userId: string) {
    return await this.remove.execute({ id: bankAccountId, userId });
  }

  async findAllService(userId: string) {
    return await this.findAll.execute(userId);
  }

  async findOneService(bankAccountId: string, userId: string) {
    return await this.findOne.execute({ id: bankAccountId, userId });
  }
}
