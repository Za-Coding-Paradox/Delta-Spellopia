import React, { useState } from 'react';
import { Box, Typography, Button, CircularProgress, IconButton, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Grid } from '@/components/Game/Grid';
import { InputBar } from '@/components/Game/InputBar';
import { StatsPanel } from '@/components/Game/StatsPanel';
import { WordsPanel } from '@/components/Game/WordsPanel';
import { MenuModal } from '@/components/Modals/MenuModal';
import { RulesModal } from '@/components/Modals/RulesModal';
import { WordInfoModal } from '@/components/Modals/WordInfoModal';
import { useGameStore } from '@/store/gameStore';
import { checkWordValidity } from '@/api/dictionary';

/**
 * The main game screen where the user interacts with the letter grid and enters words.
 * Manages input state, validation logic, and triggers modals.
 * 
 * @returns {React.ReactElement} The GamePage component.
 */
export const GamePage: React.FC = () => {
  const [input, setInput] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  
  const { 
    letters, 
    centerLetter, 
    triggerError, 
    addWord, 
    shuffleLetters,
    setMenuModalOpen,
    breakStreak
  } = useGameStore();

  const handleLetterClick = (letter: string) => {
    setInput((prev) => prev + letter);
  };

  /**
   * Handles the submission of the current input word.
   * Performs length validation, center letter inclusion check, and hits the external API.
   * Updates scoring and error state based on the result.
   */
  const handleSubmit = async () => {
    if (!input || isChecking) return;

    if (input.length < 3) {
      console.warn(`[Validation] Word too short: ${input}`);
      triggerError('Word too short');
      setInput(''); // Clear input on error
      return;
    }

    if (!input.includes(centerLetter)) {
      console.warn(`[Validation] Missing center letter in: ${input}`);
      triggerError('Missing center letter');
      setInput(''); // Clear input on error
      return;
    }

    for (const char of input) {
      if (!letters.includes(char)) {
        console.warn(`[Validation] Invalid letters used in: ${input}`);
        triggerError('Invalid letters');
        setInput(''); // Clear input on error
        return;
      }
    }

    console.info(`[Game] Validating word: ${input}`);
    setIsChecking(true);
    try {
      const wordData = await checkWordValidity(input);
      if (wordData) {
        if (wordData.audioUrl) {
          console.info(`[Audio] Playing pronunciation from: ${wordData.audioUrl}`);
          new Audio(wordData.audioUrl).play().catch((e) => console.warn('[Audio] Playback failed', e));
        }

        const points = input.length === 3 ? 1 : input.length === 4 ? 1 : input.length - 3;
        console.info(`[Game] Word added successfully: ${input} for ${points} points`);
        addWord(input, points);
      } else {
        console.info(`[Game] Word not in list: ${input}`);
        triggerError('Not in word list');
        breakStreak();
      }
      setInput(''); // Clear input on valid AND invalid
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          width: '100vw',
          margin: 0,
          p: '2vh 2vw',
          overflow: 'hidden',
        }}
      >
        {/* Header Area */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, position: 'relative' }}>
          <Tooltip title="Menu">
            <IconButton 
              onClick={() => setMenuModalOpen(true)}
              sx={{ position: 'absolute', left: 0 }}
            >
              <MenuIcon fontSize="large" />
            </IconButton>
          </Tooltip>
          <Typography 
            variant="h3" 
            sx={{ 
              flex: 1, 
              textAlign: 'center', 
              fontWeight: 'bold', 
              letterSpacing: 4,
              textShadow: '2px 2px 0px rgba(0,0,0,0.1)'
            }}
          >
            SPELLOPIA
          </Typography>
        </Box>

        {/* Main Content Split */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 3,
            flex: 1,
            minHeight: 0, // Allows children to scroll if needed
          }}
        >
          {/* Left Container: Game Board */}
          <Box
            sx={{
              flex: { xs: '1', md: '0 0 60vw' },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'background.paper',
              p: '4vh 4vw',
              borderRadius: 1,
              boxShadow: 1,
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6, width: '100%' }}>
              <Grid onLetterClick={handleLetterClick} />
              
              <InputBar 
                value={input} 
                onChange={setInput} 
                onSubmit={handleSubmit}
                onDelete={() => setInput(prev => prev.slice(0, -1))}
              />

              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                <Button variant="outlined" onClick={shuffleLetters}>
                  Shuffle
                </Button>
                <Button variant="contained" onClick={handleSubmit} disabled={isChecking}>
                  {isChecking ? <CircularProgress size={24} color="inherit" /> : 'Enter'}
                </Button>
              </Box>
            </Box>
          </Box>

          {/* Right Container: Split Vertically */}
          <Box
            sx={{
              flex: { xs: '1', md: '0 0 35vw' },
              display: 'flex',
              flexDirection: 'column',
              gap: '2vh',
            }}
          >
            {/* Top Right: Stats */}
            <Box sx={{ flex: '0 0 auto', borderRadius: 1, overflow: 'hidden', boxShadow: 1, backgroundColor: 'background.paper' }}>
              <StatsPanel />
            </Box>

            {/* Bottom Right: Words */}
            <Box sx={{ flex: '1 1 auto', borderRadius: 1, overflow: 'hidden', boxShadow: 1, minHeight: 200, backgroundColor: 'background.paper' }}>
              <WordsPanel />
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Modals */}
      <MenuModal />
      <RulesModal />
      <WordInfoModal />
    </>
  );
};
