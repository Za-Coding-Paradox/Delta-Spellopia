import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Button, DialogActions } from '@mui/material';
import { useGameStore } from '@/store/gameStore';

export const RulesModal: React.FC = () => {
  const { isRulesModalOpen, setRulesModalOpen } = useGameStore();

  return (
    <Dialog open={isRulesModalOpen} onClose={() => setRulesModalOpen(false)}>
      <DialogTitle sx={{ fontWeight: 'bold' }}>How to Play</DialogTitle>
      <DialogContent>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Create words using letters from the 9-letter grid.
        </Typography>
        <Typography variant="body2" component="ul" sx={{ pl: 2 }}>
          <li>Words must contain at least 4 letters.</li>
          <li>Words must include the center letter.</li>
          <li>Letters can be used more than once.</li>
          <li>Words must be found in the dictionary.</li>
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setRulesModalOpen(false)}>Got it</Button>
      </DialogActions>
    </Dialog>
  );
};
