import React from 'react';
import { Paper, Typography, Box, Chip } from '@mui/material';
import { useGameStore } from '@/store/gameStore';

/**
 * Renders a scrollable list of chips representing all words the user has successfully discovered.
 * Clicking a chip opens the word information modal.
 * 
 * @returns {React.ReactElement} The WordsPanel component.
 */
export const WordsPanel: React.FC = () => {
  const { discoveredWords, setSelectedWord } = useGameStore();

  return (
    <Paper
      elevation={0}
      sx={{
        width: '100%',
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
        Found Words ({discoveredWords.length})
      </Typography>
      
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1,
          alignContent: 'flex-start',
          /* Hide scrollbar */
          '&::-webkit-scrollbar': { display: 'none' },
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}
      >
        {discoveredWords.map((word, index) => (
          <Chip
            key={index}
            label={word}
            onClick={(e) => {
              setSelectedWord(word);
              (e.currentTarget as HTMLElement).blur();
            }}
            sx={{ textTransform: 'uppercase', fontWeight: 500 }}
            color="primary"
            variant="outlined"
            clickable
          />
        ))}
        {discoveredWords.length === 0 && (
          <Typography variant="body2" color="text.secondary" sx={{ width: '100%', textAlign: 'center', mt: 4 }}>
            Start typing to find words...
          </Typography>
        )}
      </Box>
    </Paper>
  );
};
