import React from 'react';
import {
  Container as MuiContainer,
  type ContainerProps as MuiContainerProps,
} from '@mui/material';

export interface ContainerProps extends MuiContainerProps {
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  maxWidth = 'lg',
  ...props
}) => {
  return (
    <MuiContainer maxWidth={maxWidth} {...props}>
      {children}
    </MuiContainer>
  );
};
