import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { DeleteCategory } from '@app/use-cases/category/delete-category';
import { FindAllCategories } from '@app/use-cases/category/find-all-categories';
import { FindCategory } from '@app/use-cases/category/find-category';
import { CreateCategory } from '@app/use-cases/category/create-category';
import { UpdateCategory } from '@app/use-cases/category/update-category';

@Injectable()
export class CategoriesService {
  constructor(
    private create: CreateCategory,
    private update: UpdateCategory,
    private remove: DeleteCategory,
    private findAll: FindAllCategories,
    private findOne: FindCategory,
  ) {}

  async createService(userId: string, createCategoryDto: CreateCategoryDto) {
    const updatedData = Object.assign(createCategoryDto, { userId });
    return await this.create.execute(updatedData);
  }

  async updateService(
    categoryId: string,
    userId: string,
    updateCategoryDto: UpdateCategoryDto,
  ) {
    const updatedData = Object.assign(updateCategoryDto, { userId });

    return await this.update.execute(categoryId, updatedData);
  }

  async removeService(categoryId: string, userId: string) {
    return await this.remove.execute({ id: categoryId, userId });
  }

  async findAllService(userId: string) {
    return await this.findAll.execute(userId);
  }

  async findOneService(categoryId: string, userId: string) {
    return await this.findOne.execute({ id: categoryId, userId });
  }
}
