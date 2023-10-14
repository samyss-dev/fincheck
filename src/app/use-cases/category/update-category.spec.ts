import { CategoriesRepository } from '@app/repositories/categories-repository';
import { UpdateCategory } from './update-category';
import { InMemoryCategoriesRepository } from '@test/in-memory/in-memory-category-repository';
import { transactionType } from '@domain/transaction';
import { Category } from '@domain/category';
import { NotFoundException } from '@nestjs/common';

describe('UpdateCategory', () => {
  let categoriesRepo: CategoriesRepository;
  let updateCategory: UpdateCategory;

  beforeEach(() => {
    categoriesRepo = new InMemoryCategoriesRepository();
    updateCategory = new UpdateCategory(categoriesRepo);
  });

  const updateCategoryRequest = {
    id: '1',
    userId: '1',
    name: 'real name',
    icon: 'real icon',
  };

  it('should be able to update an existing category', async () => {
    await categoriesRepo.create(
      new Category({
        id: '1',
        userId: '1',
        name: 'name',
        icon: 'icon',
        type: transactionType.EXPENSE,
      }),
    );

    await updateCategory.execute('1', updateCategoryRequest);

    const category = await categoriesRepo.findOne('1', '1');

    expect(category.name).toBe('real name');
    expect(category.icon).toBe('real icon');
  });

  it('should throw NotFoundException if category not found', async () => {
    await expect(() =>
      updateCategory.execute('1', updateCategoryRequest),
    ).rejects.toThrow(NotFoundException);
  });
});
