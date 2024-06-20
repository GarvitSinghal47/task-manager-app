import { FC, ReactNode } from 'react';
import { Box, BoxProps, Typography } from '@mui/material';

interface TaskCardContainerProps extends BoxProps {
  children: ReactNode;
}

export const TaskCardContainer: FC<TaskCardContainerProps> = ({ children }) => {
  return (
    <Box
      sx={{
        maxHeight: '200px',
        minHeight: '200px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {children}
    </Box>
  );
};

interface ITagContainerProps {
  tag: string;
}

export const TagContainer: FC<ITagContainerProps> = ({ tag }) => (
  <Box
    style={{
      padding: '0rem 0.5rem',
      margin: '0.1rem 0.1rem',
      backgroundColor: '#F0F0F0',
      borderRadius: '0.2rem',
    }}
  >
    <Typography variant={'body2'}>{tag}</Typography>
  </Box>
);
