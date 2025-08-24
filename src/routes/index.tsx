import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import NotFound from '../pages/not-found';
import AuthLayout from '../layouts/AuthLayout';
import LoginPage from '../pages/auth/login';
import ProtectedRoute from './ProtectedRoute';
import SignUpPage from '@/pages/auth/sign-up';
import ForgotPasswordPage from '@/pages/auth/forgot-password';
import { protectedRoutes } from './protectedRoutes';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <LoginPage />},
      { path: '/signup', element: <SignUpPage />},
      { path: '/forgot-password', element: <ForgotPasswordPage />}

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
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      ...protectedRoutes,
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  }
]);

export default router;
