import { FC, Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import { Moment } from 'moment';
import { Box, Button, Stack, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { RootState } from 'store/store';
import { StrechedBox } from 'components/atoms';
import { BarChart } from 'charts';
import { TaskState } from 'typings/interfaces';

const Dashboard: FC = () => {
  const [startDate, setStartDate] = useState<Moment | null>(null);
  const { data: tasks } = useSelector<RootState, TaskState>((state) => state.tasks);

  // TODO: Implement tasks filtering by date
  const handleFilter = () => {};

  return (
    <Fragment>
      <StrechedBox>
        <Box>
          <DatePicker disableFuture value={startDate} onChange={(newValue) => setStartDate(newValue)} />
        </Box>
        <Box>
          <Button variant="contained" disabled={!startDate} onClick={() => handleFilter()}>
            Filter
          </Button>
        </Box>
      </StrechedBox>

      {tasks && (
        <Stack>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography variant="h5" gutterBottom>
              Tasks Chart
            </Typography>
          </Box>

          <BarChart data={tasks} />
        </Stack>
      )}
    </Fragment>
  );
};

export default Dashboard;
