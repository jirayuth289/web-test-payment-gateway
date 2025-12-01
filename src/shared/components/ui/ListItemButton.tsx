import MuiListItemButton, {
  type ListItemButtonProps as MuiListItemButtonProps,
} from '@mui/material/ListItemButton';

export interface ListItemButtonProps extends MuiListItemButtonProps {}

export const ListItemButton: React.FC<ListItemButtonProps> = ({
  children,
  ...props
}) => {
  return <MuiListItemButton {...props}>{children}</MuiListItemButton>;
};
