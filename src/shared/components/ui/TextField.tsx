import React from 'react';
import {
  TextField as MuiTextField,
  type TextFieldProps as MuiTextFieldProps,
} from '@mui/material';

export type TextFieldProps = MuiTextFieldProps;

export const TextField: React.FC<TextFieldProps> = ({
  variant = 'outlined',
  size = 'medium',
  ...props
}) => {
  return <MuiTextField variant={variant} size={size} {...props} />;
};
