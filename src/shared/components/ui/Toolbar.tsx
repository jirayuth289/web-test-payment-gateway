import MuiToolbar, {
  type ToolbarProps as MuiToolbarProps,
} from '@mui/material/Toolbar';

export const Toolbar: React.FC<MuiToolbarProps> = ({ children, ...props }) => {
  return <MuiToolbar {...props}>{children}</MuiToolbar>;
};
