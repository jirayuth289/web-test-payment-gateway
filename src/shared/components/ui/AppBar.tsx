import {
  AppBar as MuiAppBar,
  type AppBarProps as MuiAppBarProps,
} from '@mui/material';

export interface AppBarProps extends MuiAppBarProps {
  position?: 'static' | 'fixed' | 'absolute' | 'sticky';
  elevation?: number;
}

export const AppBar: React.FC<AppBarProps> = ({ children, ...props }) => {
  return <MuiAppBar {...props}>{children}</MuiAppBar>;
};
