/**
 * Re-export MUI styled function for consistent imports across the application
 * 
 * The styled function is re-exported from @mui/material/styles to provide:
 * - Consistent import paths
 * - Centralized styling utilities
 * - Easier maintenance if we need to switch UI libraries in the future
 * 
 * @example
 * ```tsx
 * import { styled } from '@/shared/utils/styled';
 * import { Theme } from '@/shared/types/theme';
 * 
 * const StyledButton = styled('button')(({ theme }: { theme: Theme }) => ({
 *   padding: theme.spacing(2),
 *   backgroundColor: theme.palette.primary.main,
 * }));
 * ```
 */

export { styled } from '@mui/material/styles';

