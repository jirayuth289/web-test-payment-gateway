import * as React from 'react';

/**
 * Custom hook for managing drawer open/close state
 * Provides centralized drawer state management
 */
export const useDrawer = () => {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = React.useCallback(() => {
    setOpen(true);
  }, []);

  const handleDrawerClose = React.useCallback(() => {
    setOpen(false);
  }, []);

  const toggleDrawer = React.useCallback(() => {
    setOpen(prev => !prev);
  }, []);

  return {
    open,
    handleDrawerOpen,
    handleDrawerClose,
    toggleDrawer,
  };
};

