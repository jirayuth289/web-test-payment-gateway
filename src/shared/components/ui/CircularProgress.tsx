import MuiCircularProgress, {
  type CircularProgressProps as MuiCircularProgressProps,
} from '@mui/material/CircularProgress';

export interface CircularProgressProps extends MuiCircularProgressProps {}

export const CircularProgress: React.FC<CircularProgressProps> = props => {
  return <MuiCircularProgress {...props} />;
};

