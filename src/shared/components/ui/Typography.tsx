import React from 'react';
import MuiTypography from '@mui/material/Typography';
import type { TypographyProps as MuiTypographyProps } from '@mui/material/Typography';

export interface TypographyProps extends MuiTypographyProps {}

export const Typography: React.FC<TypographyProps> = ({ ...props }) => {
  return <MuiTypography {...props} />;
};
