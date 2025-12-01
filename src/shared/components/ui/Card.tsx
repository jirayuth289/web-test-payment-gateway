import React from 'react';
import { Card as MuiCard, type CardProps as MuiCardProps } from '@mui/material';

export interface CardProps extends MuiCardProps {
  elevation?: number;
}

export const Card: React.FC<CardProps> = ({
  children,
  elevation = 1,
  ...props
}) => {
  return (
    <MuiCard elevation={elevation} {...props}>
      {children}
    </MuiCard>
  );
};
