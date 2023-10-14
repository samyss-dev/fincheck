import { CategoriesRepository } from '@app/repositories/categories-repository';
import { Category } from '@domain/category';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindAllCategories {
  constructor(private categoriesRepo: CategoriesRepository) {}

  async execute(userId: string): Promise<Category[]> {
    return await this.categoriesRepo.findAll(userId);
  }
}
