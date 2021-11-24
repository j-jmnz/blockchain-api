import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { mockBlock, mockBlocks } from '../utils/tests/mockObjects';
import { BlockService } from './block.service';

describe('BlockService', () => {
  let service: BlockService;

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
      providers: [BlockService],
    })
      .overrideProvider(BlockService)
      .useValue(mockBlockService)
      .compile();

    service = module.get<BlockService>(BlockService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll method', () => {
    it('should call the findAll method from BlockService', async () => {
      await service.findAll();
      expect(mockBlockService.findAll).toHaveBeenCalled();
    });
    it('should return an array of Blocks', async () => {
      const blocks = await service.findAll();
      expect(blocks).toBeDefined();
      expect(Array.isArray(blocks)).toBe(true);
      expect(blocks).toBe(mockBlocks);
    });
  });

  describe('findOne method', () => {
    it('should call the findOne method from BlockService', async () => {
      const mockHash = '12345hash';
      await service.findOne(mockHash);
      expect(mockBlockService.findOne).toHaveBeenCalledWith(mockHash);
    });
    it('should return a Block object with the right hash', async () => {
      const mockHash = '12345hash';
      const block = await service.findOne(mockHash);
      expect(block).toBeDefined();
      expect(block).toStrictEqual({ ...mockBlock, hash: mockHash });
    });
  });
});
