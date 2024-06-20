import { FC, Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Button, Grid } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { RootState } from 'store/store';
import { fetchTasksAsync } from 'store/tasks/tasksSlice';
import { useDispatch } from 'hooks';
import { StrechedBox } from 'components/atoms';
import { FileUploadDownload, TaskCard } from 'components/molecules';
import { TaskForm } from 'components/organisms';
import { ITask, TaskState } from 'typings/interfaces';

const Tasks: FC = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedTask, setEditedTask] = useState<ITask | undefined>();
  const { data: tasks, status, error } = useSelector<RootState, TaskState>((state) => state.tasks);

  const handleEditTask = (task: ITask) => {
    setEditedTask(task);
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTasksAsync());
    }
  }, [status, dispatch]);

  // TODO: Add skeleton loading and Error
  if (status === 'loading') {
    return <div>Loading...</div>;
  } else if (status === 'failed') {
    return <div>Error: {error}</div>;
  }
  return (
    <Fragment>
      <StrechedBox>
        <FileUploadDownload />
        <Box>
          <Button startIcon={<AddBoxIcon />} onClick={() => setIsModalOpen(true)} variant="contained" disableElevation>
            Add Task
          </Button>
        </Box>
      </StrechedBox>

      <Box>
        <Grid container spacing={2}>
          {tasks &&
            tasks.map((task: ITask) => (
              <Grid item xs={12} sm={6} md={4} lg={4} key={task.id}>
                <TaskCard data={task} onEdit={handleEditTask} />
              </Grid>
            ))}
        </Grid>
      </Box>

      <TaskForm open={isModalOpen} editedTask={editedTask} handleClose={() => setIsModalOpen(false)} />
    </Fragment>
  );
};

export default Tasks;
