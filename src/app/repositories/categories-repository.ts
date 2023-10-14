import { Category } from '@domain/category';

export abstract class CategoriesRepository {
  abstract create(category: Category): Promise<void>;
  abstract update(id: string, category: Category): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract findAll(userId: string): Promise<Category[]>;
  abstract findOne(id: string, userId: string): Promise<Category | null>;
  abstract findByUserId(userId: string): Promise<Category | null>;
}
