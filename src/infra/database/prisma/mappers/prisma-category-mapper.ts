import { Category } from '@domain/category';
import { transactionType } from '@domain/transaction';
import { Category as PrismaCategory } from '@prisma/client';

export class PrismaCategoryMapper {
  static toPrisma(category: Category) {
    return {
      userId: category.userId,
      name: category.name,
      type: category.type,
      icon: category.icon,
    };
  }

  static toDomain(category: PrismaCategory) {
    return new Category({
      id: category.id,
      userId: category.userId,
      name: category.name,
      type: transactionType[category.type as keyof typeof transactionType],
      icon: category.icon,
    });
  }
}
