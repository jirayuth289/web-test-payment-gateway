import React from 'react';
import { Chip as MuiChip, type ChipProps as MuiChipProps } from '@mui/material';

export interface ChipProps extends MuiChipProps {
  variant?: 'filled' | 'outlined';
  color?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'error'
    | 'info';
  size?: 'small' | 'medium';
}

export const Chip: React.FC<ChipProps> = ({
  variant = 'filled',
  color = 'default',
  size = 'medium',
  ...props
}) => {
  return <MuiChip variant={variant} color={color} size={size} {...props} />;
};
