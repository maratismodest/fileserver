import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateTelegramPostDto } from './dto/create-telegram.dto';
import { TelegramsService } from './telegrams.service';

@ApiTags('Telegram')
@Controller('telegrams')
export class TelegramsController {
  constructor(private telegramService: TelegramsService) {}

  @ApiOperation({ summary: 'Post a post in Telegram chanel' })
  @ApiResponse({ status: 200, type: Object })
  @Post()
  async postInChannel(@Body() createTelegramPostDto: CreateTelegramPostDto) {
    return this.telegramService.postInChannel(createTelegramPostDto);
  }
}
