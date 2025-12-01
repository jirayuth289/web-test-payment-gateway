import MuiListItemText, {
  type ListItemTextProps as MuiListItemTextProps,
} from '@mui/material/ListItemText';

export interface ListItemTextProps extends MuiListItemTextProps {}

export const ListItemText: React.FC<ListItemTextProps> = ({
  children,
  ...props
}) => {
  return <MuiListItemText {...props}>{children}</MuiListItemText>;
};
