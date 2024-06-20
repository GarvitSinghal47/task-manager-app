import { FC, ReactNode, Fragment } from 'react';
import { Box, Container } from '@mui/material';
import { DefaultAppBar } from 'components/molecules';

interface AppBarLayoutProps {
  children: ReactNode;
}

const AppBarLayout: FC<AppBarLayoutProps> = ({ children }) => {
  return (
    <Fragment>
      <DefaultAppBar />
      <Container maxWidth="md">
        <Box sx={{ height: '100vh', maxWidth: '100%' }}>{children}</Box>
      </Container>
    </Fragment>
  );
};

export default AppBarLayout;
