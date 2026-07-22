import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { useGameStore } from '@/store/gameStore';
import { useUIStore } from '@/store/uiStore';

export const ScorePanel: React.FC = () => {
  const { score, discoveredWords } = useGameStore();
  const { theme } = useUIStore();

  const getRank = (score: number) => {
    if (score === 0) return 'Beginner';
    if (score < 10) return 'Good Start';
    if (score < 30) return 'Moving Up';
    if (score < 50) return 'Solid';
    if (score < 100) return 'Amazing';
    return 'Genius';
  };

  return (
    <Paper
      elevation={0}
      sx={{
        width: '100%',
        maxWidth: 300,
        height: 400,
        display: 'flex',
        flexDirection: 'column',
        p: 2,
      }}
    >
      <Box sx={{ borderBottom: `2px solid ${theme === 'dark' ? '#ffffff' : '#000000'}`, pb: 1, mb: 2 }}>
        <Typography variant="h6">Score: {score}</Typography>
        <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>Rank: {getRank(score)}</Typography>
      </Box>
      
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
        Words ({discoveredWords.length})
      </Typography>
      
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 0.5,
          /* Hide scrollbar for a cleaner pixel look */
          '&::-webkit-scrollbar': { display: 'none' },
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}
      >
        {discoveredWords.map((word, index) => (
          <Typography 
            key={index} 
            variant="body1" 
            sx={{ 
              textTransform: 'uppercase',
              borderLeft: `4px solid ${theme === 'dark' ? '#ffffff' : '#000000'}`,
              pl: 1
            }}
          >
            {word}
          </Typography>
        ))}
        {discoveredWords.length === 0 && (
          <Typography variant="body2" sx={{ opacity: 0.5 }}>
            No words yet...
          </Typography>
        )}
      </Box>
    </Paper>
  );
};
