import MuiIconButton, {
  type IconButtonProps as MuiIconButtonProps,
} from '@mui/material/IconButton';

export interface IconButtonProps extends MuiIconButtonProps {}

export const IconButton: React.FC<IconButtonProps> = ({
  children,
  ...props
}) => {
  return <MuiIconButton {...props}>{children}</MuiIconButton>;
};
