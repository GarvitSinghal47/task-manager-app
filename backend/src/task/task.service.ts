import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(@InjectRepository(Task) private taskRepository: Repository<Task>) {}

  async create(createTaskInput: CreateTaskInput): Promise<Task> {
    const newTask = this.taskRepository.create(createTaskInput);

    return await this.taskRepository.save(newTask);
  }

  async findAll(): Promise<Task[]> {
    return await this.taskRepository.find({});
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) throw new NotFoundException(`Task #${id} not found`);

    return task;
  }

  async update(id: string, updateTaskInput: UpdateTaskInput): Promise<Task> {
    const updateTask = await this.taskRepository.preload({
      id,
      ...updateTaskInput,
    });
    if (!updateTask) {
      throw new NotFoundException(`Task #${id} not found`);
    }
    return this.taskRepository.save(updateTask);
  }

  async remove(id: string): Promise<Task> {
    const task = await this.findOne(id);
    if (!task) {
      throw new NotFoundException(`Task #${id} not found`);
    }
    const taskCloned = { ...task };
    await this.taskRepository.remove(task);
    return taskCloned;
  }
}
