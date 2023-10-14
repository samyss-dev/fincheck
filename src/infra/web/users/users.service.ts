import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUser } from '@app/use-cases/user/update-user';
import { DeleteUser } from '@app/use-cases/user/delete-user';
import { FindUser } from '@app/use-cases/user/find-user';

@Injectable()
export class UsersService {
  constructor(
    private updateUser: UpdateUser,
    private deleteUser: DeleteUser,
    private findUser: FindUser,
  ) {}

  async findOneService(id: string) {
    return await this.findUser.execute({ id });
  }

  async updateService(id: string, updateUserDto: UpdateUserDto) {
    const updatedData = Object.assign(updateUserDto, { id });

    await this.updateUser.execute(updatedData);
  }

  async removeService(id: string) {
    await this.deleteUser.execute({ id });
  }
}
