import MuiList, { type ListProps as MuiListProps } from '@mui/material/List';

export interface ListProps extends MuiListProps {}

export const List: React.FC<ListProps> = ({ children, ...props }) => {
  return <MuiList {...props}>{children}</MuiList>;
};
