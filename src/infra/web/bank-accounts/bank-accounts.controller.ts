import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  Put,
  ParseUUIDPipe,
} from '@nestjs/common';
import { BankAccountsService } from './bank-accounts.service';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';
import { BankAccountViewModel } from './bank-account-view-model';
import { ActiveUserId } from '@shared/decorators/ActiveUserId';

@Controller('bank-accounts')
export class BankAccountsController {
  constructor(private readonly bankAccountsService: BankAccountsService) {}

  @Post()
  create(
    @ActiveUserId() userId: string,
    @Body() createBankAccountDto: CreateBankAccountDto,
  ) {
    return this.bankAccountsService.createService(userId, createBankAccountDto);
  }

  @Put(':bankAccountId')
  @HttpCode(204)
  update(
    @ActiveUserId() userId: string,
    @Param('bankAccountId', ParseUUIDPipe) bankAccountId: string,
    @Body() updateBankAccountDto: UpdateBankAccountDto,
  ) {
    return this.bankAccountsService.updateService(
      bankAccountId,
      userId,
      updateBankAccountDto,
    );
  }

  @Delete(':bankAccountId')
  @HttpCode(204)
  remove(
    @Param('bankAccountId', ParseUUIDPipe) bankAccountId: string,
    @ActiveUserId() userId: string,
  ) {
    return this.bankAccountsService.removeService(bankAccountId, userId);
  }

  @Get()
  async findAll(@ActiveUserId() userId: string) {
    const bankAccounts = await this.bankAccountsService.findAllService(userId);

    return bankAccounts.map((bankAccount) =>
      BankAccountViewModel.toWeb(bankAccount),
    );
  }

  @Get(':bankAccountId')
  async findOne(
    @Param('bankAccountId', ParseUUIDPipe) bankAccountId: string,
    @ActiveUserId() userId: string,
  ) {
    const bankAccount = await this.bankAccountsService.findOneService(
      bankAccountId,
      userId,
    );

    return BankAccountViewModel.toWeb(bankAccount);
  }
}
