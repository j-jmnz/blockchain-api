import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Block } from './entities/block.entity';
import { lastValueFrom } from 'rxjs';
import { BlockDetails } from './entities/blockDetails.entity';

const BASE_URL = 'https://blockchain.info';

@Injectable()
export class BlockService {
  private readonly logger: Logger;
  constructor(private httpService: HttpService) {
    this.logger = new Logger(BlockService.name);
  }

  async findAll(): Promise<Block[]> {
    const epochInSeconds = Math.round(Date.now() / 1000);
    const source$ = this.httpService.get(
      `${BASE_URL}/blocks/${epochInSeconds}000?format=json`,
    );

    try {
      const { data } = await lastValueFrom(source$);
      return data;
    } catch (error) {
      this.logger.error('There was an error with your request:', error);
    }
  }

  async findOne(hash: string): Promise<BlockDetails> {
    const source$ = this.httpService.get(`${BASE_URL}/rawblock/${hash}`);
    try {
      const { data } = await lastValueFrom(source$);
      return data;
    } catch (error) {
      this.logger.error('There was an error with your request:', error);
    }
  }
}
