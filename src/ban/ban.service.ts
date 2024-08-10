import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Ban } from './ban.model';

@Injectable()
export class BanService {
  constructor(
    @InjectModel(Ban)
    private banRepository: typeof Ban,
  ) {}

  async getBan(id: number) {
    const ban = await this.banRepository.findOne({
      where: { userId: id },
    });
    return ban;
  }
}
