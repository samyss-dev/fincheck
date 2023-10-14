import { Controller, Get, Body, Patch, Delete, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserViewModel } from './user-view-model';
import { ActiveUserId } from '@shared/decorators/ActiveUserId';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Patch()
  @HttpCode(204)
  update(@ActiveUserId() id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateService(id, updateUserDto);
  }

  @Delete()
  @HttpCode(204)
  remove(@ActiveUserId() id: string) {
    return this.usersService.removeService(id);
  }

  @Get('me')
  async findOne(@ActiveUserId() id: string) {
    const user = await this.usersService.findOneService(id);

    return UserViewModel.toWeb(user);
  }
}
