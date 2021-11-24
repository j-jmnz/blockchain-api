import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Block {
  @Field(() => String)
  hash: string;

  @Field(() => Int)
  height: number;

  @Field(() => Int)
  time: number;

  @Field(() => Int)
  block_index: number;
}
