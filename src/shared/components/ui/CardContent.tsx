import React from 'react';
import MuiCardContent from '@mui/material/CardContent';
import type { CardContentProps as MuiCardContentProps } from '@mui/material/CardContent';

export interface CardContentProps extends MuiCardContentProps {}

export const CardContent: React.FC<CardContentProps> = ({ sx, ...props }) => {
  return <MuiCardContent sx={{ p: 2, ...sx }} {...props} />;
};
