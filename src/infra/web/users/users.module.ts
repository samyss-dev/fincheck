import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UpdateUser } from '@app/use-cases/user/update-user';
import { DeleteUser } from '@app/use-cases/user/delete-user';
import { FindUser } from '@app/use-cases/user/find-user';
import { ProvidersModule } from '@infra/providers/providers.module';

@Module({
  imports: [ProvidersModule],
  controllers: [UsersController],
  providers: [UsersService, UpdateUser, DeleteUser, FindUser],
})
export class UsersModule {}
