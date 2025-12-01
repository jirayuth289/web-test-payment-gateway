import * as React from 'react';
import type { AuthContextType } from '@/core/types';

/**
 * Authentication Context
 * Provides authentication state and methods throughout the app
 */
export const AuthContext = React.createContext<AuthContextType | undefined>(
  undefined
);

/**
 * Hook to use authentication context
 * @throws Error if used outside AuthProvider
 */
export const useAuth = (): AuthContextType => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
