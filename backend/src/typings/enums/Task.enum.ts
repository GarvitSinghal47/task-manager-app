import { registerEnumType } from '@nestjs/graphql';

export enum TaskTypeEnum {
  STORY = 'STORY',
  BUG = 'BUG',
}

registerEnumType(TaskTypeEnum, {
  name: 'TaskTypeEnum',
  description: 'The types of tasks',
});
