import React from 'react';
import { Dialog, DialogTitle, DialogContent, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '@/store/gameStore';

export const MenuModal: React.FC = () => {
  const { isMenuModalOpen, setMenuModalOpen, setRulesModalOpen, resetGame } = useGameStore();
  const navigate = useNavigate();

  const handleExit = () => {
    resetGame();
    setMenuModalOpen(false);
    navigate('/');
  };

  return (
    <Dialog 
      open={isMenuModalOpen} 
      onClose={() => setMenuModalOpen(false)}
      sx={{ '& .MuiDialog-paper': { minWidth: 300, p: 2, textAlign: 'center' } }}
    >
      <DialogTitle sx={{ fontWeight: 'bold' }}>Menu</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 2 }}>
          <Button variant="contained" onClick={() => setMenuModalOpen(false)}>
            Resume
          </Button>
          <Button 
            variant="outlined" 
            onClick={() => {
              setMenuModalOpen(false);
              setRulesModalOpen(true);
            }}
          >
            Rules
          </Button>
          <Button variant="text" color="error" onClick={handleExit}>
            Exit (Reset Progress)
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
