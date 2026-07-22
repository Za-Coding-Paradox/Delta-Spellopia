import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Button, DialogActions } from '@mui/material';
import { useUIStore } from '@/store/uiStore';

export const SettingsModal: React.FC = () => {
  const { isSettingsModalOpen, setSettingsModalOpen } = useUIStore();

  return (
    <Dialog open={isSettingsModalOpen} onClose={() => setSettingsModalOpen(false)}>
      <DialogTitle sx={{ fontWeight: 'bold' }}>Settings</DialogTitle>
      <DialogContent>
        <Typography variant="body1" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
          Under working... Check back later!
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setSettingsModalOpen(false)}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};
