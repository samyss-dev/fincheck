import { CategoriesRepository } from '@app/repositories/categories-repository';
import { CreateCategory } from './create-category';
import { InMemoryCategoriesRepository } from '@test/in-memory/in-memory-category-repository';
import { Category } from '@domain/category';
import { transactionType } from '@domain/transaction';

describe('CreateCategory', () => {
  let categoriesRepo: CategoriesRepository;
  let createCategory: CreateCategory;

  beforeEach(() => {
    categoriesRepo = new InMemoryCategoriesRepository();
    createCategory = new CreateCategory(categoriesRepo);
  });

  const CreateCategoryRequest = {
    userId: '1',
    name: 'name',
    icon: 'icon',
    type: transactionType.EXPENSE,
  };
  it('should be able to create a new category', async () => {
    await createCategory.execute(new Category(CreateCategoryRequest));

    const category = await categoriesRepo.findByUserId('1');

    expect(category).toHaveProperty('id');
    expect(category.name).toBe('name');
    expect(category.icon).toBe('icon');
    expect(category.type).toBe(transactionType.EXPENSE);
  });
});
