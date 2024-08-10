import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Ad } from '../ads/ads.model';
import { Article } from './articles.model';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';

@ApiTags('Articles')
@Controller('articles')
export class ArticlesControllers {
  constructor(private articlesService: ArticlesService) {}

  @ApiOperation({ summary: 'Get all articles' })
  @ApiResponse({ status: 200, type: [Article] })
  @Get()
  async getAllArticles() {
    return await this.articlesService.getArticles();
  }

  @ApiOperation({ summary: 'Get article by slug' })
  @ApiResponse({ status: 200, type: Article })
  @Get(':slug')
  async getArticleBySlug(@Param() { slug }: { slug: string }) {
    return await this.articlesService.getArticle(slug);
  }

  @ApiOperation({ summary: 'Create article' })
  @ApiResponse({ status: 200, type: Ad })
  @Post()
  createAd(@Body() createDto: CreateArticleDto) {
    return this.articlesService.createArticle(createDto);
  }
}
