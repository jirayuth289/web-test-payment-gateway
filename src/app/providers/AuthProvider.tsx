import * as React from 'react';
import type { AuthContextType, User, UserRole } from '@/core/types';
import { AuthContext } from './AuthContext';

interface AuthProviderProps {
  children: React.ReactNode;
}

/**
 * Authentication Provider
 * Manages authentication state and provides auth methods
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  // Initialize auth state from localStorage
  React.useEffect(() => {
    const storedUser = localStorage.getItem('auth_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('auth_user');
      }
    }
    setIsLoading(false);
  }, []);

  /**
   * Login function
   * In a real app, this would make an API call
   */
  const login = React.useCallback(
    async (email: string, password: string): Promise<void> => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));

        // Mock authentication - in real app, validate with backend
        // For demo: admin@example.com / admin123 = admin role
        // user@example.com / user123 = user role
        let mockUser: User | null = null;

        if (email === 'admin@example.com' && password === 'admin123') {
          mockUser = {
            id: '1',
            email: 'admin@example.com',
            name: 'Admin User',
            role: 'admin',
          };
        } else if (email === 'user@example.com' && password === 'user123') {
          mockUser = {
            id: '2',
            email: 'user@example.com',
            name: 'Regular User',
            role: 'user',
          };
        } else if (email === 'manager@example.com' && password === 'manager123') {
          mockUser = {
            id: '3',
            email: 'manager@example.com',
            name: 'Manager User',
            role: 'manager',
          };
        } else {
          throw new Error('Invalid email or password');
        }

        setUser(mockUser);
        localStorage.setItem('auth_user', JSON.stringify(mockUser));
      } catch (error) {
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  /**
   * Logout function
   */
  const logout = React.useCallback(() => {
    setUser(null);
    localStorage.removeItem('auth_user');
  }, []);

  /**
   * Check if user has specific role
   */
  const hasRole = React.useCallback(
    (role: UserRole): boolean => {
      return user?.role === role;
    },
    [user]
  );

  /**
   * Check if user has any of the specified roles
   */
  const hasAnyRole = React.useCallback(
    (roles: UserRole[]): boolean => {
      return user ? roles.includes(user.role) : false;
    },
    [user]
  );

  const value: AuthContextType = React.useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      logout,
      hasRole,
      hasAnyRole,
    }),
    [user, isLoading, login, logout, hasRole, hasAnyRole]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

