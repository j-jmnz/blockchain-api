import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class TxEntity {
  @Field()
  hash: string;

  @Field(() => Int)
  ver: number;

  @Field(() => Int)
  vin_sz: number;

  @Field(() => Int)
  vout_sz: number;

  @Field(() => Int)
  size: number;

  @Field(() => Int)
  weight: number;

  @Field(() => Int)
  fee: number;

  @Field()
  relayed_by: string;

  @Field()
  lock_time: string;

  @Field(() => Float, { nullable: true })
  tx_index?: number;

  @Field(() => Boolean)
  double_spend: boolean;

  @Field(() => Int)
  time: number;

  @Field(() => Int)
  block_index: number;

  @Field(() => Int)
  block_height: number;

  @Field(() => [InputsEntity], { nullable: true })
  inputs?: InputsEntity[] | null;

  @Field(() => [OutEntity], { nullable: true })
  out?: OutEntity[] | null;
}

@ObjectType()
export class PrevOutOrOutEntity {
  @Field(() => Boolean)
  spent: boolean;

  @Field()
  script: string;

  @Field(() => [SpendingOutpointsEntity], { nullable: true })
  spending_outpoints?: SpendingOutpointsEntity[] | null;

  @Field(() => Float, { nullable: true })
  tx_index?: number;

  @Field(() => String, { nullable: true })
  value?: string;

  @Field()
  addr: string;

  @Field(() => Int)
  n: number;

  @Field(() => Int)
  type: number;
}

@ObjectType()
export class InputsEntity {
  @Field({ nullable: true })
  sequence?: string;

  @Field()
  witness: string;

  @Field()
  script: string;

  @Field(() => Int)
  index: number;

  @Field(() => PrevOutOrOutEntity, { nullable: true })
  prev_out?: PrevOutOrOutEntity | null;
}

@ObjectType()
export class SpendingOutpointsEntity {
  @Field(() => Float, { nullable: true })
  tx_index?: number;

  @Field(() => Int)
  n: number;
}

@ObjectType()
export class OutEntity {
  @Field(() => Int)
  type: number;

  @Field(() => Boolean)
  spent: boolean;

  @Field(() => String, { nullable: true })
  value?: string;

  @Field(() => [SpendingOutpointsEntity], { nullable: true })
  spending_outpoints?: SpendingOutpointsEntity[] | null;

  @Field(() => Int)
  n: number;

  @Field(() => Float, { nullable: true })
  tx_index?: number;

  @Field()
  script: string;

  @Field({ nullable: true })
  addr?: string | null;
}
