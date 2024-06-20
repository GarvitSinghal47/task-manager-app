import { InputType, Field } from '@nestjs/graphql';
import { TaskTypeEnum } from 'src/typings/enums';

@InputType()
export class CreateTaskInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  type: TaskTypeEnum;

  @Field()
  startDate: string;

  @Field()
  tags: string;
}
