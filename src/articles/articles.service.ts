import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Article } from './articles.model';
import { CreateArticleDto } from './dto/create-article.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article)
    private articlesRepository: typeof Article,
  ) {}

  async getArticles() {
    return this.articlesRepository.findAll();
  }

  async getArticle(slug: string) {
    const article = await this.articlesRepository.findOne({
      where: { slug },
    });
    return article;
  }

  async createArticle(createDto: CreateArticleDto) {
    return await this.articlesRepository.create(createDto);
  }
}
