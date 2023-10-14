import { Category } from './category';
import { transactionType } from './transaction';

describe('Category', () => {
  it('should be able to create a category', () => {
    const category = new Category({
      userId: '1',
      name: 'Salary',
      icon: 'random icon',
      type: transactionType.INCOME,
    });

    expect(category).toBeInstanceOf(Category);
    expect(category).toHaveProperty('id');
    expect(category.name).toBe('Salary');
    expect(category.icon).toBe('random icon');
    expect(category.type).toBe(transactionType.INCOME);
  });
});
