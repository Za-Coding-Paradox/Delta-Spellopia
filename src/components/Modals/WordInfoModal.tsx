import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, IconButton, Box, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useGameStore } from '@/store/gameStore';
import { useCacheStore } from '@/store/cacheStore';

export const WordInfoModal: React.FC = () => {
  const { selectedWord, setSelectedWord } = useGameStore();
  const { checkCache } = useCacheStore();

  const handleClose = () => setSelectedWord(null);

  const wordData = selectedWord ? checkCache(selectedWord) : null;

  if (!selectedWord) return null;

  return (
    <Dialog 
      open={!!selectedWord} 
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      sx={{ '& .MuiDialog-paper': { borderRadius: 4, p: 1 } }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
            {selectedWord}
          </Typography>
          {wordData?.phonetic && (
            <Typography variant="subtitle2" color="text.secondary">
              {wordData.phonetic}
            </Typography>
          )}
        </Box>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent dividers sx={{ borderBottom: 'none' }}>
        {!wordData ? (
          <Typography>No dictionary data found.</Typography>
        ) : (
          wordData.meanings.map((meaning, idx) => (
            <Box key={idx} sx={{ mb: 3 }}>
              <Typography variant="subtitle1" color="primary" gutterBottom sx={{ fontWeight: 'bold', fontStyle: 'italic' }}>
                {meaning.partOfSpeech}
              </Typography>
              
              {meaning.synonyms && meaning.synonyms.length > 0 && (
                <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
                  <strong>Synonyms:</strong> {meaning.synonyms.join(', ')}
                </Typography>
              )}
              {meaning.antonyms && meaning.antonyms.length > 0 && (
                <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
                  <strong>Antonyms:</strong> {meaning.antonyms.join(', ')}
                </Typography>
              )}

              <Box component="ul" sx={{ pl: 2, m: 0 }}>
                {meaning.definitions.map((def, dIdx) => (
                  <li key={dIdx} style={{ marginBottom: '8px' }}>
                    <Typography variant="body2">{def.definition}</Typography>
                    {def.example && (
                      <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', mt: 0.5 }}>
                        "{def.example}"
                      </Typography>
                    )}
                  </li>
                ))}
              </Box>
              {idx < wordData.meanings.length - 1 && <Divider sx={{ mt: 2 }} />}
            </Box>
          ))
        )}
      </DialogContent>
    </Dialog>
  );
};
