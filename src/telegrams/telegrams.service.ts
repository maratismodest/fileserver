import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

import { CategoryProps } from '../utils/constants/categories';
import { convertLinksToMedia } from '../utils/convertLinksToMedia';
import { CreateTelegramPostDto } from './dto/create-telegram.dto';

@Injectable()
export class TelegramsService {
  constructor(private readonly httpService: HttpService) {}

  async postInChannel(telegramDto: CreateTelegramPostDto) {
    const { title, body, price, slug, username, categoryId } = telegramDto;
    const { data: categories } = await this.httpService.axiosRef.get<
      CategoryProps[]
    >(process.env.SERVER_DOMAIN_URL + '/categories');
    const category: string = categories.find((item) => item.id == categoryId)
      ?.label as string;
    const images = telegramDto.images.split('||');
    const bodyText = body.length > 800 ? body.substring(0, 800) + '...' : body;
    const text = `Категория: #${category}\nЦена: ${price} \n\n${title} \n\n${bodyText} \n\nПодробнее: ${process.env.SITE_DOMAIN_URL}/post/${slug} \n\nавтор: @${username}`;

    const sendPhoto = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMediaGroup?chat_id=${process.env.TELEGRAM_CHAT_ID}`;

    const media = convertLinksToMedia(images, text);
    // console.log('media', media);
    // console.log('sendPhoto', sendPhoto);
    await this.httpService.axiosRef.post(sendPhoto, { media });
    return { status: 'success' };
  }
}
