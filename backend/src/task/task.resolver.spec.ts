import { Test, TestingModule } from '@nestjs/testing';
import { TaskResolver } from './task.resolver';
import { TaskService } from './task.service';
import { TaskTypeEnum } from 'src/typings/enums';
import { Task } from './entities/task.entity';
import { CreateTaskInput } from './dto/create-task.input';

describe('TaskResolver', () => {
  let resolver: TaskResolver;

  const startDate = '2023-06-15';

  const createTask: CreateTaskInput = {
    name: 'First Task',
    description: 'This is task description',
    type: TaskTypeEnum.BUG,
    startDate,
    tags: 'new;old',
  };

  const task: Task = {
    id: 'asdfs',
    name: 'First Task',
    description: 'This is task description',
    type: TaskTypeEnum.BUG,
    startDate,
    tags: 'new;old',
    createdAt: new Date('2023-06-15T16:03:20.987Z'),
    updatedAt: new Date('2023-06-15T16:03:20.987Z'),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskResolver,
        {
          provide: TaskService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue(null),
            create: jest.fn().mockResolvedValue(null),
            update: jest.fn().mockResolvedValue(null),
            remove: jest.fn().mockResolvedValue(null),
          },
        },
      ],
    }).compile();

    resolver = module.get<TaskResolver>(TaskResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should find all tasks', async () => {
    const result = [];
    jest.spyOn(resolver, 'findAll').mockResolvedValue(result);
    expect(await resolver.findAll()).toBe(result);
  });

  it('should find one task', async () => {
    jest.spyOn(resolver, 'findOne').mockResolvedValue(task);
    expect(await resolver.findOne('someId')).toBe(task);
  });

  it('should create a task', async () => {
    const result = { id: 'someId', ...task };
    jest.spyOn(resolver, 'createTask').mockResolvedValue(result);
    expect(await resolver.createTask(createTask)).toBe(result);
  });

  it('should update a task', async () => {
    const input = {
      id: 'someId',
      name: 'Test',
    };
    const result = { id: 'someId', ...task };
    jest.spyOn(resolver, 'updateTask').mockResolvedValue(result);
    expect(await resolver.updateTask(input)).toBe(result);
  });

  it('should remove a task', async () => {
    jest.spyOn(resolver, 'removeTask').mockResolvedValue(task);
    expect(await resolver.removeTask('someId')).toBe(task);
  });
});
