import { BarDatum } from '@nivo/bar';
import { ITask } from 'typings/interfaces';

export const cleanBarChartData = (data: ITask[]): BarDatum[] => {
  const transformedData = data.reduce((result: any, chartData) => {
    const type = chartData.type.toLowerCase();

    // Initialize the count for the day if it doesn't exist
    if (!result[chartData.startDate]) {
      result[chartData.startDate] = { date: chartData.startDate, bug: 0, story: 0 };
    }

    // Increment the count based on the task type
    if (type === 'bug') {
      result[chartData.startDate].bug += 1;
    } else if (type === 'story') {
      result[chartData.startDate].story += 1;
    }

    return result;
  }, {});

  const newChartData: BarDatum[] = Object.values(transformedData);

  return newChartData;
};
