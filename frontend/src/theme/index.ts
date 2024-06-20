import { createTheme, responsiveFontSizes } from '@mui/material/styles';

import typography from './typography';
import palette from './palette';

const borderRadius = '0.3rem';
const padding = '1rem';

const theme = createTheme({
  typography,
  palette,
  components: {
    MuiButton: {
      defaultProps: {
        color: 'primary',
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          padding: '1rem',
          width: '100%',
        },
      },
      defaultProps: {
        variant: 'outlined',
      },
    },
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
        position: 'static',
      },
    },
    MuiTypography: {
      defaultProps: {
        color: 'inerit',
        variant: 'body1',
      },
    },
    MuiIconButton: {
      defaultProps: {
        size: 'medium',
        color: 'inherit',
      },
    },
    MuiStack: {
      defaultProps: {
        sx: {
          backgroundColor: 'white',
          borderRadius,
          padding,
        },
      },
    },
  },
  zIndex: {
    appBar: 1200,
    drawer: 1100,
  },
});

export default responsiveFontSizes(theme);
