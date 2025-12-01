import MuiListItem, {
  type ListItemProps as MuiListItemProps,
} from '@mui/material/ListItem';

export interface ListItemProps extends MuiListItemProps {}

export const ListItem: React.FC<ListItemProps> = ({ children, ...props }) => {
  return <MuiListItem {...props}>{children}</MuiListItem>;
};
