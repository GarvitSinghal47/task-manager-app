import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppBarLayout } from 'layouts';
import { DashboardPage, TasksPage } from './pages';

const AppRouter: FC = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <AppBarLayout>
              <DashboardPage />
            </AppBarLayout>
          }
        />
        <Route
          path="/tasks"
          element={
            <AppBarLayout>
              <TasksPage />
            </AppBarLayout>
          }
        />
        <Route
          path="*"
          element={
            <AppBarLayout>
              <Navigate to="/" />
            </AppBarLayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
