import { CategoriesRepository } from '@app/repositories/categories-repository';
import { Category } from '@domain/category';
import { Injectable, NotFoundException } from '@nestjs/common';

interface FindCategoryRequest {
  id: string;
  userId: string;
}

@Injectable()
export class FindCategory {
  constructor(private categoriesRepo: CategoriesRepository) {}

  async execute(request: FindCategoryRequest): Promise<Category | null> {
    const { id, userId } = request;

    const category = await this.categoriesRepo.findOne(id, userId);

    if (!category) throw new NotFoundException('Category not found');

    return category;
  }
}
