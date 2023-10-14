import { CategoriesRepository } from '@app/repositories/categories-repository';
import { PrismaService } from '../prisma.service';
import { Category } from '@domain/category';
import { PrismaCategoryMapper } from '../mappers/prisma-category-mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaCategoriesRepository implements CategoriesRepository {
  constructor(private prisma: PrismaService) {}

  async create(category: Category): Promise<void> {
    const data = PrismaCategoryMapper.toPrisma(category);

    await this.prisma.category.create({ data });
  }

  async update(id: string, category: Category): Promise<void> {
    const data = PrismaCategoryMapper.toPrisma(category);

    await this.prisma.category.update({ where: { id }, data });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.category.delete({ where: { id } });
  }

  async findAll(userId: string): Promise<Category[]> {
    const categories = await this.prisma.category.findMany({
      where: { userId },
    });

    return categories.map((category) =>
      PrismaCategoryMapper.toDomain(category),
    );
  }

  async findOne(id: string, userId: string): Promise<Category | null> {
    const category = await this.prisma.category.findUnique({
      where: { id, userId },
    });

    return category ? PrismaCategoryMapper.toDomain(category) : null;
  }

  async findByUserId(userId: string): Promise<Category | null> {
    const category = await this.prisma.category.findFirst({
      where: { userId },
    });

    return category ? PrismaCategoryMapper.toDomain(category) : null;
  }
}
