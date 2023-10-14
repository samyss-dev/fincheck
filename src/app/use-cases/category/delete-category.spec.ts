import { CategoriesRepository } from '@app/repositories/categories-repository';
import { DeleteCategory } from './delete-category';
import { InMemoryCategoriesRepository } from '@test/in-memory/in-memory-category-repository';
import { Category } from '@domain/category';
import { transactionType } from '@domain/transaction';
import { NotFoundException } from '@nestjs/common';

describe('DeleteCategory', () => {
  let categoriesRepo: CategoriesRepository;
  let deleteCategory: DeleteCategory;

  beforeEach(() => {
    categoriesRepo = new InMemoryCategoriesRepository();
    deleteCategory = new DeleteCategory(categoriesRepo);
  });

  it('should be able to delete an existing category', async () => {
    await categoriesRepo.create(
      new Category({
        id: '1',
        userId: '1',
        name: 'real name',
        icon: 'real icon',
        type: transactionType.EXPENSE,
      }),
    );
    await deleteCategory.execute({ id: '1', userId: '1' });

    const category = categoriesRepo.findOne('1', '1');

    expect(category).toBeNull;
  });

  it('should throw NotFoundException if category not found', async () => {
    await expect(() =>
      deleteCategory.execute({ id: '1', userId: '1' }),
    ).rejects.toThrow(NotFoundException);
  });
});
