import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op, Sequelize } from 'sequelize';

import { Ad } from './ads.model';
import { CreateAdDto } from './dto/create-ad.dto';
import { GetAdsDto } from './dto/get-ads.dto';
import { GetRelatedAdsDto } from './dto/get-related-ads.dto';
import { UpdateAdDto } from './dto/update-ad.dto';

@Injectable()
export class AdsService {
  constructor(
    @InjectModel(Ad)
    private postsRepository: typeof Ad,
  ) {}

  async getAd(slug: string) {
    const post = await this.postsRepository.findOne({
      where: { slug },
      include: { all: true },
    });
    return post;
  }

  async getMostExpensive() {
    const mostExpensive = await this.postsRepository.findOne({
      order: [['price', 'DESC']],
    });
    return mostExpensive;
  }

  async getAdsByParams(query: GetAdsDto) {
    const mostExpensive = await this.getMostExpensive();
    let min = 0;
    let max = mostExpensive ? mostExpensive.price : 1000;
    // let max = 100;
    let page = 0;
    let size = 12;
    let categoryId = 1;
    let userId = 0;
    const pageAsNumber = query.page;
    const sizeAsNumber = query.size;
    const categoryAsNumber = query.categoryId;
    const userIdAsNumber = query.userId;
    const minAsNumber = query.min;
    const maxAsNumber = query.max;

    if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
      page = pageAsNumber;
    }
    if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0) {
      size = sizeAsNumber;
    }
    if (!Number.isNaN(minAsNumber) && minAsNumber > 0) {
      min = minAsNumber;
    }
    if (!Number.isNaN(maxAsNumber) && maxAsNumber > 0) {
      max = maxAsNumber;
    }

    const options = {};

    if (!Number.isNaN(categoryAsNumber) && categoryAsNumber > 0) {
      categoryId = categoryAsNumber;
      options['categoryId'] = categoryId;
    }

    if (!Number.isNaN(userIdAsNumber) && userIdAsNumber > 0) {
      userId = userIdAsNumber;
      options['userId'] = userId;
    }

    const posts = await Ad.findAndCountAll({
      offset: page * size,
      limit: size,
      order: [['createdAt', 'DESC']],
      where: {
        ...options,
        price: {
          [Op.and]: {
            [Op.gte]: min,
            [Op.lte]: max,
          },
        },
      },
    });
    return {
      content: posts.rows,
      totalPages: Math.ceil(posts.count / size),
    };
  }

  async getRelatedAdsByParams(query: GetRelatedAdsDto) {
    const posts = await Ad.findAll({
      where: { categoryId: query.categoryId },
      order: [Sequelize.fn('RANDOM')],
      offset: 0,
      limit: 6,
    });
    return posts;
  }

  async createAd(postDto: CreateAdDto) {
    await this.checkAdSlug(postDto.slug);
    return await this.postsRepository.create(postDto);
  }

  async checkAdSlug(slug: string) {
    const post = await this.postsRepository.findOne({
      where: { slug },
    });
    if (post) {
      throw new HttpException(
        'There is a post with the same slug',
        HttpStatus.CONFLICT,
      );
    }
  }

  async updateAd(id: number, postDto: UpdateAdDto) {
    const post = await this.postsRepository.update(
      { ...postDto },
      { where: { id } },
    );
    return await this.getAd(postDto.slug);
  }

  async deleteAd(id: number) {
    const post = await this.postsRepository.destroy({
      where: {
        id,
      },
    });
    return post;
  }
}
