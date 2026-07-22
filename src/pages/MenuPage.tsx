import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Dock } from '@/components/Dock/Dock';
import { SettingsModal } from '@/components/Modals/SettingsModal';
import { StatsModal } from '@/components/Modals/StatsModal';
import { useGameStore } from '@/store/gameStore';

/**
 * The landing page of the application providing navigation to start the game
 * or view rules and settings.
 * 
 * @returns {React.ReactElement} The MenuPage component.
 */
export const MenuPage: React.FC = () => {
  const navigate = useNavigate();
  const { resetGame } = useGameStore();

  const handlePlay = () => {
    resetGame();
    navigate('/game');
  };

  return (
    <>
      <Dock />
      <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100%',
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: '6rem',
          fontWeight: 'bold',
          mb: 4,
          textShadow: '4px 4px 0px rgba(0,0,0,0.2)', // Slightly subtle shadow
        }}
      >
        SPELLOPIA
      </Typography>
      
      <Button
        variant="outlined"
        size="large"
        onClick={handlePlay}
        sx={{
          fontSize: '2rem',
          px: 6,
          py: 2,
        }}
      >
        PLAY
      </Button>
    </Box>
    <SettingsModal />
    <StatsModal />
    </>
  );
};
