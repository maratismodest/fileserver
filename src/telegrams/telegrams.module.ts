import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { TelegramsController } from './telegrams.controller';
import { TelegramsService } from './telegrams.service';

@Module({
  providers: [TelegramsService],
  controllers: [TelegramsController],
  imports: [HttpModule],
  exports: [TelegramsService],
})
export class TelegramsModule {}
