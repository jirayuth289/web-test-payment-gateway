import {
  ChevronLeftIcon,
  ChevronRightIcon,
  IconButton,
} from '@/shared/components';
import { useTheme } from '@/shared/hooks/ui';

/**
 * Drawer toggle button component
 * Handles drawer close action with RTL support
 */
export const DrawerToggleButton: React.FC<{ onClick: () => void }> = ({
  onClick,
}) => {
  const theme = useTheme();

  return (
    <IconButton onClick={onClick}>
      {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
    </IconButton>
  );
};
