import React from 'react';
import { Box as MuiBox, type BoxProps as MuiBoxProps } from '@mui/material';

export interface BoxProps extends MuiBoxProps {
  component?: React.ElementType;
}

export const Box: React.FC<BoxProps> = ({
  children,
  component = 'div',
  ...props
}) => {
  return (
    <MuiBox component={component} {...props}>
      {children}
    </MuiBox>
  );
};
