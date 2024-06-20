import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateTaskInput } from './dto/create-task.input';
import { TaskTypeEnum } from 'src/typings/enums';
import { NotFoundException } from '@nestjs/common';
import { UpdateTaskInput } from './dto/update-task.input';

describe('TaskService', () => {
  let service: TaskService;
  let repo: Repository<Task>;

  const startDate = '2023-06-15';

  const testTask: CreateTaskInput = {
    name: 'First Task',
    description: 'This is task description',
    type: TaskTypeEnum.BUG,
    startDate,
    tags: 'new;old',
  };

  const updateTask: UpdateTaskInput = {
    ...testTask,
    id: 'asdfs',
    name: 'WOW',
  };

  const savedTask: Task = {
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
      providers: [TaskService, { provide: getRepositoryToken(Task), useClass: Repository }],
    }).compile();

    service = module.get<TaskService>(TaskService);
    repo = module.get<Repository<Task>>(getRepositoryToken(Task));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a task', async () => {
      const createSpy = jest.spyOn(repo, 'create').mockReturnValueOnce(testTask as Task);

      const saveSpy = jest.spyOn(repo, 'save').mockResolvedValueOnce(savedTask);

      expect(await service.create(testTask)).toEqual(savedTask);

      expect(createSpy).toHaveBeenCalledWith(testTask);
      expect(saveSpy).toHaveBeenCalledWith(testTask);
    });
  });

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      const testTasks: Task[] = [
        /* populate with valid data */
      ];

      jest.spyOn(repo, 'find').mockResolvedValueOnce(testTasks);

      expect(await service.findAll()).toEqual(testTasks);
    });
  });

  describe('findOne', () => {
    it('should return a single task', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValueOnce(testTask as Task);

      expect(await service.findOne('testId')).toEqual(testTask);
    });

    it('should throw an error if task is not found', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValueOnce(undefined);

      await expect(service.findOne('testId')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a task', async () => {
      const updatedTask: Task = { ...savedTask, ...updateTask };
      jest.spyOn(repo, 'preload').mockResolvedValueOnce(updatedTask as Task);
      jest.spyOn(repo, 'save').mockResolvedValueOnce(updatedTask);

      expect(await service.update('testId', updatedTask)).toEqual(updatedTask);
    });

    it('should throw an error if task is not found', async () => {
      jest.spyOn(repo, 'preload').mockResolvedValueOnce(null);

      await expect(service.update('testId', { id: 'abc', name: 'WOW' })).rejects.toThrow();
    });
  });

  describe('remove', () => {
    it('should remove a task', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(savedTask);
      jest.spyOn(repo, 'remove').mockResolvedValueOnce(savedTask);

      expect(await service.remove('testId')).toEqual(savedTask);
    });

    it('should throw an error if task is not found', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(null);

      await expect(service.remove('testId')).rejects.toThrow();
    });
  });
});
