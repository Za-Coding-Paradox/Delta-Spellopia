import React from 'react';
import { Paper, Typography, Box, Divider } from '@mui/material';
import { useGameStore } from '@/store/gameStore';

export const StatsPanel: React.FC = () => {
  const { score, currentStreak, maxStreak, wordLengthCounts } = useGameStore();

  return (
    <Paper
      elevation={0}
      sx={{
        width: '100%',
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        height: '100%',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Score</Typography>
        <Typography variant="h4" color="primary" sx={{ fontWeight: 'bold' }}>{score}</Typography>
      </Box>

      <Divider />

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="body2" color="text.secondary">Current Streak</Typography>
          <Typography variant="h6">{currentStreak}</Typography>
        </Box>
        <Box sx={{ textAlign: 'right' }}>
          <Typography variant="body2" color="text.secondary">Max Streak</Typography>
          <Typography variant="h6">{maxStreak}</Typography>
        </Box>
      </Box>

      <Divider />

      <Box>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Words Found by Length
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6">{wordLengthCounts[3] || 0}</Typography>
            <Typography variant="caption" color="text.secondary">3 Letters</Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6">{wordLengthCounts[4] || 0}</Typography>
            <Typography variant="caption" color="text.secondary">4 Letters</Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6">{wordLengthCounts[5] || 0}</Typography>
            <Typography variant="caption" color="text.secondary">5+ Letters</Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};
