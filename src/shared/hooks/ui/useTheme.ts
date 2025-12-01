import { useTheme as useMuiTheme } from '@mui/material/styles';
import type { Theme } from '@/shared/types';

/**
 * Custom hook that wraps MUI's useTheme
 * Provides access to the theme object with type safety
 *
 * @returns The current theme object
 *
 * @example
 * ```tsx
 * import { useTheme } from '@/shared/hooks/ui';
 *
 * function MyComponent() {
 *   const theme = useTheme();
 *   const primaryColor = theme.palette.primary.main;
 *   return <div style={{ color: primaryColor }}>Hello</div>;
 * }
 * ```
 */
export const useTheme = (): Theme => {
  return useMuiTheme();
};
