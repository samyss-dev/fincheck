import { CategoriesRepository } from '@app/repositories/categories-repository';
import { Category } from '@domain/category';

export class InMemoryCategoriesRepository implements CategoriesRepository {
  categories: Category[] = [];

  async create(category: Category): Promise<void> {
    this.categories.push(category);
  }

  async update(id: string, category: Category): Promise<void> {
    const categoryIndex = this.categories.findIndex(
      (category) => category.id === id,
    );

    this.categories[categoryIndex] = category;
  }

  async delete(id: string): Promise<void> {
    this.categories.filter((category) => category.id !== id);
  }

  async findAll(userId: string): Promise<Category[]> {
    return this.categories.filter((category) => category.userId === userId);
  }

  async findOne(id: string, userId: string): Promise<Category> {
    const category = this.categories.find(
      (category) => category.id === id && category.userId === userId,
    );

    if (!category) return null;

    return category;
  }

  async findByUserId(userId: string): Promise<Category> {
    const category = this.categories.find(
      (category) => category.userId === userId,
    );

    if (!category) return null;

    return category;
  }
}
