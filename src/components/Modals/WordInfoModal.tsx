import React from 'react';
import { Typography, Box, Divider } from '@mui/material';
import { useGameStore } from '@/store/gameStore';
import { useCacheStore } from '@/store/cacheStore';
import { BaseModal } from '@/components/Modals/BaseModal';

/**
 * Renders a modal displaying detailed dictionary information for a selected word,
 * including phonetics, definitions, synonyms, and antonyms.
 * 
 * @returns {React.ReactElement | null} The WordInfoModal component or null if no word is selected.
 */
export const WordInfoModal: React.FC = () => {
  const { selectedWord, setSelectedWord } = useGameStore();
  const { checkCache } = useCacheStore();

  const handleClose = () => setSelectedWord(null);

  const wordData = selectedWord ? checkCache(selectedWord) : null;

  if (!selectedWord) return null;

  return (
    <BaseModal 
      open={!!selectedWord} 
      onClose={handleClose}
      title={<Typography variant="h5" sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>{selectedWord}</Typography>}
      subtitle={wordData?.phonetic}
      maxWidth="sm"
    >
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
    </BaseModal>
  );
};
