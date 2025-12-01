import * as React from 'react';
import { Route, Routes, Navigate } from 'react-router';
import { navigationConfig } from './config';
import { flattenRoutes } from './utils';
import { ProtectedRoute } from './guards';
import { LoginPage } from '@/features/auth';

/**
 * Application routes configuration (Composite Pattern)
 * Uses centralized navigation config for better maintainability
 *
 * Routes are automatically generated from navigationConfig
 * Supports nested routes through Composite Pattern flattening
 * Includes route guards for authentication and authorization
 */
export const AppRoutes: React.FC = () => {
  const routes = React.useMemo(() => flattenRoutes(navigationConfig), []);

  return (
    <Routes>
      {/* Public route - Login */}
      <Route path="/login" element={<LoginPage />} />

      {/* Protected routes from navigation config */}
      {routes.map(route => {
        const requiresAuth = route.metadata?.requiresAuth ?? false;
        const requiredRoles = route.metadata?.roles;

        // Wrap component with ProtectedRoute if authentication is required
        const routeElement = requiresAuth ? (
          <ProtectedRoute requiredRoles={requiredRoles}>
            <route.component />
          </ProtectedRoute>
        ) : (
          <route.component />
        );

        return (
          <Route key={route.id} path={route.path} element={routeElement} />
        );
      })}

      {/* Catch all - redirect to login for unknown routes */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};
