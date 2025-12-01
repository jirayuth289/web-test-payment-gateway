import React from 'react';
import {
  Modal as MuiModal,
  type ModalProps as MuiModalProps,
} from '@mui/material';

export interface ModalProps extends MuiModalProps {
  open: boolean;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({
  children,
  open,
  onClose,
  ...props
}) => {
  return (
    <MuiModal open={open} onClose={onClose} {...props}>
      {children}
    </MuiModal>
  );
};
