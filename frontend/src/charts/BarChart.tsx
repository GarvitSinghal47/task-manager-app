import { FC } from 'react';
import { Box } from '@mui/material';
import { ResponsiveBar } from '@nivo/bar';
import { ITask } from 'typings/interfaces';
import { cleanBarChartData } from './chart.utils';

const colors = ['#ff6b6b', '#6b6bff'];

interface IBarChartProps {
  data: ITask[];
}

const BarChart: FC<IBarChartProps> = ({ data }) => {
  return (
    <Box
      sx={{
        height: '500px',
        padding: '1rem',
      }}
    >
      <ResponsiveBar
        data={cleanBarChartData(data)}
        keys={['bug', 'story']}
        indexBy="date"
        colors={colors}
        margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
        axisBottom={{
          tickRotation: 0,
          legend: 'Date',
          legendPosition: 'middle',
          legendOffset: 40,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          legend: 'Count',
          legendPosition: 'middle',
          legendOffset: -40,
        }}
      />
    </Box>
  );
};

export default BarChart;
