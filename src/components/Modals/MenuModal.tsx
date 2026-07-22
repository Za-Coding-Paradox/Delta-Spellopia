import React from 'react';
import { Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '@/store/gameStore';
import { BaseModal } from '@/components/Modals/BaseModal';

/**
 * Renders the in-game menu modal, allowing users to resume, view rules, or exit.
 * 
 * @returns {React.ReactElement} The MenuModal component.
 */
export const MenuModal: React.FC = () => {
  const { isMenuModalOpen, setMenuModalOpen, setRulesModalOpen, resetGame } = useGameStore();
  const navigate = useNavigate();

  /**
   * Handles the exit action by resetting the game state and navigating to home.
   */
  const handleExit = () => {
    resetGame();
    setMenuModalOpen(false);
    navigate('/');
  };

  return (
    <BaseModal 
      open={isMenuModalOpen} 
      onClose={() => setMenuModalOpen(false)}
      title="Menu"
      maxWidth="xs"
    >
      <Stack spacing={2} sx={{ mt: 2, textAlign: 'center' }}>
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
    </BaseModal>
  );
};
