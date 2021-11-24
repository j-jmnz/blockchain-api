import { ObjectType, Field, Int } from '@nestjs/graphql';
import { TxEntity } from './tx.entity';

@ObjectType()
export class BlockDetails {
  @Field(() => String)
  hash: string;

  @Field(() => Int)
  ver: number;

  @Field(() => String)
  prev_block: string;

  @Field(() => String)
  mrkl_root: string;

  @Field(() => Int)
  time: number;

  @Field(() => Int)
  bits: number;

  @Field(() => [String], { nullable: true })
  next_block?: string[] | null;

  @Field(() => Int)
  fee: number;

  @Field(() => String, { nullable: true })
  nonce?: string;

  @Field(() => Int)
  n_tx: number;

  @Field(() => Int)
  size: number;

  @Field(() => Int)
  block_index: number;

  @Field(() => Boolean)
  main_chain: boolean;

  @Field(() => Int)
  height: number;

  @Field(() => Int)
  weight: number;

  @Field(() => [TxEntity], { nullable: true })
  tx?: TxEntity[] | null;
}
