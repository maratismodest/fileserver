import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Ban, Ban as BanModel } from './ban.model';
import { BanService } from './ban.service';

@ApiTags('Ban')
@Controller('ban')
export class BanControllers {
  constructor(private banService: BanService) {}

  @ApiOperation({ summary: 'Get banned user by id' })
  @ApiResponse({ status: 200, type: Ban })
  @Get(':id')
  async getBanById(@Param() { id }: { id: number }): Promise<BanModel> {
    return this.banService.getBan(id);
  }
}
