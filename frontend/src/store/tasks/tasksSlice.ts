import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTasksAPI, createTaskAPI, updateTaskAPI, deleteTaskAPI } from 'api/graphql/tasks.API';
import { TaskState, ICreateTask, IUpdateTask } from 'typings/interfaces/task.interfaces';

export const fetchTasksAsync = createAsyncThunk('tasks/fetchTasks', async () => {
  return await fetchTasksAPI();
});

export const createTaskAsync = createAsyncThunk('tasks/createTask', async (newTask: ICreateTask) => {
  return await createTaskAPI(newTask);
});

export const updateTaskAsync = createAsyncThunk('tasks/updateTask', async (taskToUpdate: IUpdateTask) => {
  return await updateTaskAPI(taskToUpdate);
});

export const deleteTaskAsync = createAsyncThunk('tasks/deleteTask', async (taskId: string) => {
  return await deleteTaskAPI(taskId);
});

const initialState: TaskState = {
  data: [],
  status: 'idle',
  error: null,
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasksAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTasksAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchTasksAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createTaskAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createTaskAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data.push(action.payload);
      })
      .addCase(createTaskAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateTaskAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateTaskAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.data.findIndex((task) => task.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(updateTaskAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteTaskAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteTaskAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.data.findIndex((task) => task.id === action.payload.id);
        if (index !== -1) {
          state.data.splice(index, 1);
        }
      })
      .addCase(deleteTaskAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default tasksSlice.reducer;
