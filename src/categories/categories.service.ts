import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Category } from './categories.model';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category)
    private categoriesRepository: typeof Category,
  ) {}

  async getAllCategories() {
    return await this.categoriesRepository.findAll();
  }
}
