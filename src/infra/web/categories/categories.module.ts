import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { CreateCategory } from '@app/use-cases/category/create-category';
import { UpdateCategory } from '@app/use-cases/category/update-category';
import { DeleteCategory } from '@app/use-cases/category/delete-category';
import { FindAllCategories } from '@app/use-cases/category/find-all-categories';
import { FindCategory } from '@app/use-cases/category/find-category';

@Module({
  controllers: [CategoriesController],
  providers: [
    CategoriesService,
    CreateCategory,
    UpdateCategory,
    DeleteCategory,
    FindAllCategories,
    FindCategory,
  ],
})
export class CategoriesModule {}
