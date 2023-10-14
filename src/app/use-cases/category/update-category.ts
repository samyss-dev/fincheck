import { CategoriesRepository } from '@app/repositories/categories-repository';
import { Category } from '@domain/category';
import { transactionType } from '@domain/transaction';
import { Injectable, NotFoundException } from '@nestjs/common';

interface UpdateCategoryRequest {
  userId: string;
  name?: string;
  icon?: string;
  type?: transactionType;
}

@Injectable()
export class UpdateCategory {
  constructor(private categoriesRepo: CategoriesRepository) {}
  async execute(id: string, request: UpdateCategoryRequest): Promise<void> {
    const { userId, icon, name, type } = request;

    const category = await this.categoriesRepo.findOne(id, userId);

    if (!category) throw new NotFoundException('Category not found.');

    const updatedCategory = new Category({
      id: category.id,
      userId: category.userId,
      name: name ?? category.name,
      type: type ?? category.type,
      icon: icon ?? category.icon,
    });

    await this.categoriesRepo.update(id, updatedCategory);
  }
}
