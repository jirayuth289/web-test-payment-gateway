import { IconButton, MenuIcon, Toolbar, Typography, Box } from '@/shared/components';
import { useAuth } from '@/app/providers';
import { useNavigate } from 'react-router';
import * as React from 'react';
import { Logout } from '@mui/icons-material';

interface AppBarContentProps {
  onMenuClick: () => void;
  open: boolean;
}

/**
 * AppBar content component
 * Separated for better maintainability and reusability
 */
export const AppBarContent: React.FC<AppBarContentProps> = ({
  onMenuClick,
  open,
}) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Toolbar>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={onMenuClick}
        edge="start"
        sx={[
          {
            marginRight: 5,
          },
          open && { display: 'none' },
        ]}
      >
        <MenuIcon />
      </IconButton>
      <Typography variant="h4" noWrap component="div" sx={{ flexGrow: 1 }}>
        Car Rental Scheduler
      </Typography>
      {user && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="body2" noWrap>
            {user.name} ({user.role})
          </Typography>
          <IconButton
            color="inherit"
            aria-label="logout"
            onClick={handleLogout}
            edge="end"
          >
            <Logout />
          </IconButton>
        </Box>
      )}
    </Toolbar>
  );
};
