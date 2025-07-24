import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Dashboard from '../pages/dashboard';
import NotFound from '../pages/not-found';
import AuthLayout from '../layouts/AuthLayout';
import LoginPage from '../pages/auth/login';
import ProtectedRoute from './ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <LoginPage />}
    ]
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      // other protected routes
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  }
]);

export default router;
