import { CategoriesRepository } from '@app/repositories/categories-repository';
import { Category } from '@domain/category';
import { transactionType } from '@domain/transaction';
import { Injectable } from '@nestjs/common';

interface CreateCategoryRequest {
  userId: string;
  name: string;
  icon: string;
  type: transactionType;
}

@Injectable()
export class CreateCategory {
  constructor(private categoriesRepo: CategoriesRepository) {}

  async execute(request: CreateCategoryRequest): Promise<void> {
    const { userId, name, icon, type } = request;

    const category = new Category({
      userId,
      name,
      icon,
      type,
    });

    await this.categoriesRepo.create(category);
  }
}
