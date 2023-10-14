import { CategoriesRepository } from '@app/repositories/categories-repository';
import { FindCategory } from './find-category';
import { InMemoryCategoriesRepository } from '@test/in-memory/in-memory-category-repository';
import { transactionType } from '@domain/transaction';
import { Category } from '@domain/category';
import { NotFoundException } from '@nestjs/common';

describe('FindCategory', () => {
  let categoriesRepo: CategoriesRepository;
  let findCategory: FindCategory;

  beforeEach(() => {
    categoriesRepo = new InMemoryCategoriesRepository();
    findCategory = new FindCategory(categoriesRepo);
  });

  const categoryData = {
    id: '1',
    userId: '1',
    name: 'real name',
    icon: 'real name',
    type: transactionType.INCOME,
  };

  it('should be able to find an existing category', async () => {
    await categoriesRepo.create(new Category(categoryData));

    const category = await findCategory.execute({ id: '1', userId: '1' });

    expect(category).toEqual(new Category(categoryData));
  });

  it('should throw NotFoundException if category not found', async () => {
    await expect(
      findCategory.execute({ id: '1', userId: '1' }),
    ).rejects.toThrow(NotFoundException);
  });
});
