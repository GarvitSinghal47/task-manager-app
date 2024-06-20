import { Home as HomeIcon } from '@mui/icons-material';
import { IMenuRoute } from 'typings/interfaces';

const menuRoutes: IMenuRoute[] = [
  {
    name: 'Home',
    icon: HomeIcon,
    path: '/',
  },
  {
    name: 'Tasks',
    path: '/tasks',
  },
];

export default menuRoutes;
