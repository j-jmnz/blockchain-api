import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { mockBlock, mockBlocks } from '../utils/tests/mockObjects';
import { BlockResolver } from './block.resolver';
import { BlockService } from './block.service';

describe('BlockResolver', () => {
  let resolver: BlockResolver;

  const mockBlockService = {
    findAll: jest.fn(() => mockBlocks),
    findOne: jest.fn((hash) => {
      return {
        ...mockBlock,
        hash,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [BlockResolver, BlockService],
    })
      .overrideProvider(BlockService)
      .useValue(mockBlockService)
      .compile();

    resolver = module.get<BlockResolver>(BlockResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('findAll query', () => {
    it('should call the findAll method from BlockService', async () => {
      await resolver.findAll();
      expect(mockBlockService.findAll).toHaveBeenCalled();
    });
    it('should return a defined object', async () => {
      const blocks = await resolver.findAll();
      expect(blocks).toBeDefined();
    });
  });

  describe('findOne query', () => {
    it('should call the findOne method from BlockService', async () => {
      const mockHash = '12345hash';
      await resolver.findOne(mockHash);
      expect(mockBlockService.findOne).toHaveBeenCalledWith(mockHash);
    });
    it('should return a defined object', async () => {
      const mockHash = '12345hash';
      const block = await resolver.findOne(mockHash);
      expect(block).toBeDefined();
    });
  });
});
