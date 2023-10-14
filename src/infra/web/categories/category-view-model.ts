import { Category } from '@domain/category';

export class CategoryViewModel {
  static toWeb(category: Category) {
    return {
      id: category.id,
      name: category.name,
      icon: category.icon,
      type: category.type,
    };
  }
}
