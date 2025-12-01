import * as React from 'react';
import { Box, Divider } from '@/shared/components';
import { AppBarContent } from './AppBarContent';
import { DrawerContent } from './DrawerContent';
import { BreadcrumbNav } from './BreadcrumbNav';
import {
  DrawerHeader,
  LayoutContainer,
  MainContent,
  StyledAppBar,
  StyledDrawer,
} from './layout.styles';
import { DrawerToggleButton } from './DrawerToggleButton';
import { useDrawer } from './useDrawer';

interface AppLayoutProps {
  children?: React.ReactNode;
}

/**
 * Main application layout component
 * Contains AppBar, Drawer, and main content area
 */
export default function AppLayout({ children }: AppLayoutProps) {
  const { open, handleDrawerOpen, handleDrawerClose } = useDrawer();

  return (
    <LayoutContainer>
      <StyledAppBar position="fixed" open={open}>
        <AppBarContent onMenuClick={handleDrawerOpen} open={open} />
      </StyledAppBar>
      <StyledDrawer variant="permanent" open={open}>
        <DrawerHeader>
          <DrawerToggleButton onClick={handleDrawerClose} />
        </DrawerHeader>
        <Divider />
        <DrawerContent open={open} />
      </StyledDrawer>
      <MainContent component="main">
        <Box sx={{ mb: 7 }}></Box>
        <BreadcrumbNav />
        {children}
      </MainContent>
    </LayoutContainer>
  );
}
