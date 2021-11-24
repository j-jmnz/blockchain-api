import { Resolver, Query, Args } from '@nestjs/graphql';
import { BlockService } from './block.service';
import { Block } from './entities/block.entity';
import { BlockDetails } from './entities/blockDetails.entity';

@Resolver(() => Block)
export class BlockResolver {
  constructor(private readonly blockService: BlockService) {}

  @Query(() => [Block], { name: 'blocks' })
  findAll() {
    return this.blockService.findAll();
  }

  @Query(() => BlockDetails, { name: 'block' })
  findOne(@Args('hash', { type: () => String }) hash: string) {
    return this.blockService.findOne(hash);
  }
}
