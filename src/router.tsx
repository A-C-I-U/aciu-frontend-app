import { createBrowserRouter } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/dashboard';
import NotFound from './pages/not-found';
import AuthLayout from './layouts/AuthLayout';
import LoginPage from './pages/auth/login';

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
    element: <MainLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export default router;
