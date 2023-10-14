import { CategoriesRepository } from '@app/repositories/categories-repository';
import { Injectable, NotFoundException } from '@nestjs/common';

interface DeleteCategoryRequest {
  id: string;
  userId: string;
}

@Injectable()
export class DeleteCategory {
  constructor(private categoriesRepo: CategoriesRepository) {}
  async execute(request: DeleteCategoryRequest): Promise<void> {
    const { id, userId } = request;

    const category = await this.categoriesRepo.findOne(id, userId);

    if (!category) throw new NotFoundException('Category not found.');

    await this.categoriesRepo.delete(id);
  }
}
