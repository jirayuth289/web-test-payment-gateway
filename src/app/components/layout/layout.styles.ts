import { Link } from 'react-router';
import {
  AppBar,
  type AppBarProps,
  Box,
  Drawer,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@/shared/components';
import { CSSObject, Theme } from '@/shared/types';
import { styled } from '@/shared/utils';

export const drawerWidth = 240;

export const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

export const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export interface StyledAppBarProps extends AppBarProps {
  open?: boolean;
}

export const StyledAppBar = styled(AppBar, {
  shouldForwardProp: prop => prop !== 'open',
})<StyledAppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

export const StyledDrawer = styled(Drawer, {
  shouldForwardProp: prop => prop !== 'open',
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
      },
    },
  ],
}));

/**
 * Main layout container with flex display
 */
export const LayoutContainer = styled(Box)({
  display: 'flex',
});

/**
 * Main content area with flex grow and padding
 */
export const MainContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
}));

/**
 * Styled link for sidebar navigation items
 */
export const SidebarLink = styled(Link)({
  textDecoration: 'none',
  color: 'inherit',
  display: 'block',
});

/**
 * Styled list item for sidebar
 */
export const SidebarListItem = styled(ListItem)({
  display: 'block',
  padding: 0,
});

/**
 * Styled list item button with responsive behavior
 */
export const SidebarListItemButton = styled(ListItemButton)<{ open: boolean }>(
  ({ theme, open }) => ({
    minHeight: 48,
    paddingLeft: theme.spacing(2.5),
    paddingRight: theme.spacing(2.5),
    justifyContent: open ? 'initial' : 'center',
  })
);

/**
 * Styled list item icon with responsive behavior
 */
export const SidebarListItemIcon = styled(ListItemIcon)<{ open: boolean }>(
  ({ theme, open }) => ({
    minWidth: 0,
    justifyContent: 'center',
    marginRight: open ? theme.spacing(3) : 'auto',
  })
);

/**
 * Styled list item text with fade animation
 */
export const SidebarListItemText = styled(ListItemText)<{ open: boolean }>(
  ({ open }) => ({
    opacity: open ? 1 : 0,
    transition: 'opacity 0.2s ease-in-out',
  })
);
