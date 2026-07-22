import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Box, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

/**
 * Props for the BaseModal component.
 */
export interface BaseModalProps {
  /** Indicates whether the modal is open */
  open: boolean;
  /** Callback fired when the modal requests to be closed */
  onClose: () => void;
  /** The title of the modal */
  title: string | React.ReactNode;
  /** The content of the modal */
  children: React.ReactNode;
  /** Optional action buttons to render at the bottom */
  actions?: React.ReactNode;
  /** Optional subtitle to render below the title */
  subtitle?: React.ReactNode;
  /** Maximum width of the modal */
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  /** Whether the modal should take up the full width of its container */
  fullWidth?: boolean;
}

/**
 * A highly reusable base modal component that encapsulates the Material UI Dialog
 * boilerplate (Title, Content, Actions, and Close Button).
 * 
 * @param {BaseModalProps} props - The properties for the BaseModal.
 * @returns {React.ReactElement} The rendered modal component.
 */
export const BaseModal: React.FC<BaseModalProps> = ({
  open,
  onClose,
  title,
  children,
  actions,
  subtitle,
  maxWidth = 'sm',
  fullWidth = true
}) => {
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      sx={{ '& .MuiDialog-paper': { borderRadius: 4, p: 1 } }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 'bold' }}>
        <Box>
          {typeof title === 'string' ? <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{title}</Typography> : title}
          {subtitle && (
            <Typography variant="subtitle2" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>
        <IconButton onClick={onClose} edge="end" aria-label="close">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent dividers sx={{ borderBottom: actions ? undefined : 'none' }}>
        {children}
      </DialogContent>
      
      {actions && (
        <DialogActions>
          {actions}
        </DialogActions>
      )}
    </Dialog>
  );
};
