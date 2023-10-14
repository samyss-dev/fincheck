import { CategoriesRepository } from '@app/repositories/categories-repository';
import { FindAllCategories } from './find-all-categories';
import { InMemoryCategoriesRepository } from '@test/in-memory/in-memory-category-repository';
import { Category } from '@domain/category';
import { transactionType } from '@domain/transaction';

describe('FindAllCategories', () => {
  let categoriesRepo: CategoriesRepository;
  let findAllCategories: FindAllCategories;

  beforeEach(() => {
    categoriesRepo = new InMemoryCategoriesRepository();
    findAllCategories = new FindAllCategories(categoriesRepo);
  });

  const categoryData = {
    id: '1',
    userId: '1',
    name: 'real name',
    icon: 'real icon',
    type: transactionType.EXPENSE,
  };

  it('should be able to find all existing categories', async () => {
    await categoriesRepo.create(new Category(categoryData));

    const foundCategories = await findAllCategories.execute('1');

    expect(foundCategories).toHaveLength(1);
  });

  it('should return a empty list of categories', async () => {
    const categories = await findAllCategories.execute('');

    expect(categories).toStrictEqual([]);
  });
});
