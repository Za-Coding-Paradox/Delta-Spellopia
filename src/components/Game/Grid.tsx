import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { useGameStore } from '@/store/gameStore';

interface GridProps {
  onLetterClick: (letter: string) => void;
}

export const Grid: React.FC<GridProps> = ({ onLetterClick }) => {
  const { letters, centerLetter, isShaking } = useGameStore();
  const theme = useTheme();

  return (
    <Box
      className={isShaking ? 'shake' : ''}
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1.5vmin',
        width: 'fit-content',
        margin: '0 auto',
      }}
    >
      {letters.map((letter, index) => {
        const isCenter = letter === centerLetter;

        return (
          <Box
            key={index}
            onClick={() => onLetterClick(letter)}
            sx={{
              width: '10vmin',
              height: '10vmin',
              minWidth: 50,
              minHeight: 50,
              maxWidth: 100,
              maxHeight: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              userSelect: 'none',
              transition: 'all 0.1s ease',
              borderRadius: 1, // 4px small rounded corner
              backgroundColor: isCenter ? theme.palette.text.primary : theme.palette.background.paper,
              color: isCenter ? theme.palette.background.paper : theme.palette.text.primary,
              boxShadow: theme.shadows[1],
              border: `2px solid ${theme.palette.divider}`,
              '&:hover': {
                transform: 'scale(1.05)',
                backgroundColor: isCenter ? theme.palette.text.primary : theme.palette.action.hover,
              },
              '&:active': {
                transform: 'scale(0.95)',
              },
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize: 'clamp(1.5rem, 4vmin, 2.5rem)' }}>
              {letter}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};
