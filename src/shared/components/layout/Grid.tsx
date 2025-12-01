import React from 'react';
import { Grid as MuiGrid, type GridProps as MuiGridProps } from '@mui/material';

export type GridProps = MuiGridProps;

export const Grid: React.FC<GridProps> = ({ children, ...props }) => {
  return <MuiGrid {...props}>{children}</MuiGrid>;
};
