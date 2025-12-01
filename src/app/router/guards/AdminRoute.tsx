import * as React from 'react';
import { ProtectedRoute } from './ProtectedRoute';

interface AdminRouteProps {
  children: React.ReactNode;
}

/**
 * Admin Route Component
 * Guards routes that require admin role
 */
export const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  return <ProtectedRoute requiredRoles={['admin']}>{children}</ProtectedRoute>;
};
