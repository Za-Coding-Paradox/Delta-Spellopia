import React from 'react';
import { Dialog, DialogTitle, DialogContent, Button, DialogActions } from '@mui/material';
import { useUIStore } from '@/store/uiStore';
import { StatsPanel } from '@/components/Game/StatsPanel';

export const StatsModal: React.FC = () => {
  const { isStatsOpen, setStatsOpen } = useUIStore();

  return (
    <Dialog open={isStatsOpen} onClose={() => setStatsOpen(false)} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 'bold' }}>Statistics</DialogTitle>
      <DialogContent>
        <StatsPanel />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setStatsOpen(false)}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};
