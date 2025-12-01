import MuiCollapse, {
  type CollapseProps as MuiCollapseProps,
} from '@mui/material/Collapse';

export interface CollapseProps extends MuiCollapseProps {}

export const Collapse: React.FC<CollapseProps> = ({ children, ...props }) => {
  return <MuiCollapse {...props}>{children}</MuiCollapse>;
};
