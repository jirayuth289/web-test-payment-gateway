import MuiDivider, {
  type DividerProps as MuiDividerProps,
} from '@mui/material/Divider';

export interface DividerProps extends MuiDividerProps {}

export const Divider: React.FC<DividerProps> = ({ ...props }) => {
  return <MuiDivider {...props} />;
};
