import { TaskTypeEnum } from 'typings/enums';

export interface ITask {
  id: string;
  name: string;
  description: string;
  type: TaskTypeEnum;
  startDate: string;
  tags: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface ICreateTask {
  name: string;
  description: string;
  type: TaskTypeEnum;
  startDate: string;
  tags: string;
}

export interface IUpdateTask extends ICreateTask {
  id: string;
}

// Redux related interfaces
export interface TaskState {
  data: ITask[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null | undefined;
}
