import MuiListItemIcon, {
  type ListItemIconProps as MuiListItemIconProps,
} from '@mui/material/ListItemIcon';

export interface ListItemIconProps extends MuiListItemIconProps {}

export const ListItemIcon: React.FC<ListItemIconProps> = ({
  children,
  ...props
}) => {
  return <MuiListItemIcon {...props}>{children}</MuiListItemIcon>;
};
