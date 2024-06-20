import { useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, MenuItem, TextField } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useDispatch } from 'hooks';
import { createTaskAsync, updateTaskAsync } from 'store/tasks/tasksSlice';
import { ICreateTask, ITask, IUpdateTask } from 'typings/interfaces';
import { TaskTypeEnum } from 'typings/enums';

interface AddTaskFormProps {
  open: boolean;
  handleClose: () => void;
  editedTask?: ITask;
}

const TaskForm: React.FC<AddTaskFormProps> = ({ open, handleClose, editedTask }) => {
  const scroll = 'paper';
  const dispatch = useDispatch();

  const defaultValues: ICreateTask | IUpdateTask = editedTask
    ? { ...editedTask, startDate: editedTask?.startDate || '' }
    : { name: '', description: '', type: TaskTypeEnum.STORY, startDate: '', tags: '' };

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ICreateTask | IUpdateTask>({ defaultValues });

  const descriptionElementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  useEffect(() => {
    if (editedTask) {
      reset({ ...editedTask, startDate: '' });
    }
  }, [editedTask, reset]);

  const onSubmit = (data: ICreateTask | IUpdateTask) => {
    data.startDate = data.startDate
      ? dayjs(data.startDate).format('YYYY-MM-DD')
      : dayjs(new Date()).format('YYYY-MM-DD');

    const dataToSend: ICreateTask | IUpdateTask = { ...data };
    if ('createdAt' in dataToSend) delete dataToSend.createdAt;
    if ('updatedAt' in dataToSend) delete dataToSend.updatedAt;

    editedTask && 'id' in dataToSend
      ? dispatch(updateTaskAsync(dataToSend as IUpdateTask))
      : dispatch(createTaskAsync(dataToSend as ICreateTask));
    handleClose();
  };

  const getFormTitle = editedTask ? 'Edit task' : 'Add new task';
  const submitButtonText = editedTask ? 'Edit' : 'Add';
  return (
    <Dialog scroll={'paper'} open={open} onClose={handleClose}>
      <DialogTitle>{getFormTitle}</DialogTitle>

      <DialogContent dividers={scroll === 'paper'}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              name="name"
              control={control}
              rules={{ required: 'Task name is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="name"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  fullWidth
                  label="Task Name"
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                  fullWidth
                  multiline
                  rows={3}
                  label="Task Description"
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="tags"
              control={control}
              rules={{ required: 'Task tags is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="tags"
                  error={!!errors.tags}
                  helperText={errors.tags?.message}
                  fullWidth
                  label="Tags"
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="type"
              control={control}
              rules={{ required: 'Task type is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={!!errors.type}
                  helperText={errors.type?.message}
                  fullWidth
                  select
                  label="Task Type"
                >
                  <MenuItem value={TaskTypeEnum.BUG}>Bug</MenuItem>
                  <MenuItem value={TaskTypeEnum.STORY}>Story</MenuItem>
                </TextField>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="startDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  label="Start Date"
                  disableFuture
                  value={field.value ? dayjs(field.value).toDate() : null}
                  onChange={(newDate: Date | null) => {
                    field.onChange(newDate);
                  }}
                />
              )}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit(onSubmit)}>{submitButtonText}</Button>
      </DialogActions>
    </Dialog>
  );
};
export default TaskForm;
