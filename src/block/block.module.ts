import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { BlockService } from './block.service';
import { BlockResolver } from './block.resolver';

@Module({
  imports: [HttpModule],
  providers: [BlockResolver, BlockService],
})
export class BlockModule {}
