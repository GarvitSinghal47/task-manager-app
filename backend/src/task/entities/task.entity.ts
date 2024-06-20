import { ObjectType, Field } from '@nestjs/graphql';
import { TaskTypeEnum } from 'src/typings/enums';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  description: string;

  @Field(() => TaskTypeEnum)
  @Column({
    type: 'enum',
    enum: TaskTypeEnum,
    default: TaskTypeEnum.STORY,
  })
  type: TaskTypeEnum;

  @Field()
  @Column()
  startDate: string;

  @Field()
  @Column()
  tags: string;

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
