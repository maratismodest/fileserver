import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../utils/jwt-auth.guard';
import { Ad, Ad as AdModel } from './ads.model';
import { AdsService } from './ads.service';
import { CreateAdDto } from './dto/create-ad.dto';
import { GetAdsDto } from './dto/get-ads.dto';
import { GetRelatedAdsDto } from './dto/get-related-ads.dto';
import { UpdateAdDto } from './dto/update-ad.dto';

@ApiTags('Ads')
@Controller('ads')
export class AdsControllers {
  constructor(private postsService: AdsService) {}

  @ApiOperation({ summary: 'Get all ads' })
  @ApiResponse({ status: 200, type: [Ad] })
  @Get()
  async getAds(@Query() getAdDto: GetAdsDto) {
    return this.postsService.getAdsByParams(getAdDto);
  }

  @ApiOperation({ summary: 'Get related ads' })
  @ApiResponse({ status: 200, type: [Ad] })
  @Get('related')
  async getRelatedAds(@Query() getRelatedAdDto: GetRelatedAdsDto) {
    return this.postsService.getRelatedAdsByParams(getRelatedAdDto);
  }

  @ApiOperation({ summary: 'Get ad by slug' })
  @ApiResponse({ status: 200, type: Ad })
  @Get(':slug')
  async getAdById(@Param() { slug }: { slug: string }): Promise<AdModel> {
    return this.postsService.getAd(slug);
  }

  @ApiOperation({ summary: 'Create ad' })
  @ApiResponse({ status: 200, type: Ad })
  @UseGuards(JwtAuthGuard)
  @Post()
  createAd(@Body() credentialsDto: CreateAdDto) {
    return this.postsService.createAd(credentialsDto);
  }

  @ApiOperation({ summary: 'Update ad by id' })
  @ApiResponse({ status: 200, type: Ad })
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateAd(
    @Param() { id }: { id: number },
    @Body() credentialsDto: UpdateAdDto,
  ) {
    return this.postsService.updateAd(id, credentialsDto);
  }

  @ApiOperation({ summary: 'Delete ad by id' })
  @ApiResponse({ status: 200, type: Ad })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteCredentials(@Param() { id }: { id: number }) {
    return this.postsService.deleteAd(id);
  }

  @ApiOperation({ summary: 'Get most expensive ad' })
  @ApiResponse({ status: 200, type: Ad })
  @Get('max')
  async getMostExpensive(): Promise<AdModel> {
    return this.postsService.getMostExpensive();
  }
}
