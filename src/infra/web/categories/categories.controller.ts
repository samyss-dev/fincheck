import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryViewModel } from './category-view-model';
import { ActiveUserId } from '@shared/decorators/ActiveUserId';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async create(
    @ActiveUserId() userId: string,
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    return await this.categoriesService.createService(
      userId,
      createCategoryDto,
    );
  }

  @Get()
  async findAll(@ActiveUserId() userId: string) {
    const categories = await this.categoriesService.findAllService(userId);

    return categories.map((category) => CategoryViewModel.toWeb(category));
  }

  @Get(':categoryId')
  async findOne(
    @Param('categoryId', ParseUUIDPipe) categoryId: string,
    @ActiveUserId() userId: string,
  ) {
    const category = await this.categoriesService.findOneService(
      categoryId,
      userId,
    );

    return CategoryViewModel.toWeb(category);
  }

  @Patch(':categoryId')
  @HttpCode(204)
  async update(
    @ActiveUserId() userId: string,
    @Param('categoryId', ParseUUIDPipe) categoryId: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return await this.categoriesService.updateService(
      categoryId,
      userId,
      updateCategoryDto,
    );
  }

  @Delete(':categoryId')
  @HttpCode(204)
  remove(
    @ActiveUserId() userId: string,
    @Param('categoryId', ParseUUIDPipe) categoryId: string,
  ) {
    this.categoriesService.removeService(categoryId, userId);
  }
}
