import { graphqlClient } from '../client';
import { fetchTasksQuery, createTaskMutation, updateTaskMutation, deleteTaskMutation } from './tasks.queries';
import { ICreateTask, IUpdateTask } from 'typings/interfaces';

export const fetchTasksAPI = async () => {
  const response = await graphqlClient.post('', { query: fetchTasksQuery });
  return response.data.data.tasks;
};

export const createTaskAPI = async (newTask: ICreateTask) => {
  const response = await graphqlClient.post('', {
    query: createTaskMutation,
    variables: {
      input: newTask,
    },
  });

  return response.data.data.createTask;
};

export const updateTaskAPI = async (updatedFields: IUpdateTask) => {
  const response = await graphqlClient.post('', {
    query: updateTaskMutation,
    variables: {
      input: updatedFields,
    },
  });

  return response.data.data.updateTask;
};

export const deleteTaskAPI = async (taskId: string) => {
  const mutation = deleteTaskMutation;

  const response = await graphqlClient.post('', {
    query: mutation,
    variables: {
      id: taskId,
    },
  });

  return response.data.data.removeTask;
};
