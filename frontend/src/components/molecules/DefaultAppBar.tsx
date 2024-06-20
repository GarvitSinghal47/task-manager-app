import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Container, Typography, Box, Button } from '@mui/material';
import { menuRoutes } from '../../constants';
import { IMenuRoute } from 'typings/interfaces';

const DefaultAppBar: FC = () => {
  const navigate = useNavigate();
  return (
    <AppBar>
      <Toolbar variant="dense">
        <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">The Venture City</Typography>
          <Box sx={{ display: 'flex' }}>
            {menuRoutes.map((item: IMenuRoute) => (
              <Button key={item.name} onClick={() => navigate(item.path)} color="inherit">
                {item.name}
              </Button>
            ))}
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default DefaultAppBar;
