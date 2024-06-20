import { blueGrey, teal, deepPurple, green, lightBlue, red, blue } from '@mui/material/colors';

const white = '#FFFFFF';
const black = '#000000';

const palette = {
  black,
  white,
  primary: {
    contrastText: white,
    dark: teal[900],
    main: teal[800],
    light: teal[700],
  },
  secondary: {
    contrastText: white,
    dark: deepPurple[900],
    main: deepPurple[800],
    light: deepPurple[100],
  },
  success: {
    contrastText: white,
    dark: green[900],
    main: green[800],
    light: green[100],
  },
  info: {
    contrastText: white,
    dark: lightBlue[900],
    main: lightBlue[800],
    light: lightBlue[100],
  },
  error: {
    contrastText: white,
    dark: red[900],
    main: red[800],
    light: red[100],
  },
  text: {
    primary: blueGrey[900],
    secondary: blueGrey[600],
    link: blue[600],
  },
  background: {
    default: blueGrey[50],
    paper: white,
  },
  icon: teal[600],
  divider: white[200],
};

export default palette;
