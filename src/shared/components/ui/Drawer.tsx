import MuiDrawer, {
  type DrawerProps as MuiDrawerProps,
} from '@mui/material/Drawer';

export interface DrawerProps extends MuiDrawerProps {}

export const Drawer: React.FC<DrawerProps> = ({ children, ...props }) => {
  return <MuiDrawer {...props}>{children}</MuiDrawer>;
};
