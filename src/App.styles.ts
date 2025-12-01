import { Box } from '@/shared/components';
import { styled } from '@/shared/utils';

/**
 * Main app container styled component
 * Provides consistent layout styling for the root application container
 */
export const AppContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  width: '100%',
});

