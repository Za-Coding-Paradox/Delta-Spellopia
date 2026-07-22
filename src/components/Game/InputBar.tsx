import React, { useEffect, useCallback } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { useGameStore } from '@/store/gameStore';

interface InputBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onDelete: () => void;
}

/**
 * Renders the input text field where users can type words.
 * Listens for keyboard events to allow typing directly.
 * 
 * @param {InputBarProps} props - The component props.
 * @returns {React.ReactElement} The InputBar component.
 */
export const InputBar: React.FC<InputBarProps> = ({ value, onChange, onSubmit, onDelete }) => {
  const { isError, centerLetter, letters, clearError } = useGameStore();
  const theme = useTheme();

  const handleCharInput = useCallback((char: string) => {
    if (!letters.includes(char)) return; // Prevent typing invalid letters
    if (isError) clearError();
    onChange(value + char);
  }, [letters, isError, clearError, onChange, value]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      if (e.key === 'Enter') {
        onSubmit();
        return;
      }

      if (e.key === 'Backspace') {
        onDelete();
        if (isError) clearError();
        return;
      }

      const char = e.key.toUpperCase();
      if (/^[A-Z]$/.test(char)) {
        handleCharInput(char);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isError, onSubmit, onDelete, clearError, handleCharInput]);

  return (
    <Box
      className={isError ? 'error-flash' : ''}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
        width: '100%',
        maxWidth: 320,
        margin: '0 auto',
        borderRadius: 1, // 4px
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[1],
        border: `2px solid ${theme.palette.divider}`,
        transition: 'all 0.2s ease',
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 600,
          letterSpacing: 6,
          color: theme.palette.text.primary,
        }}
      >
        {value.split('').map((char, index) => (
          <span
            key={index}
            style={{
              color: char === centerLetter && !isError ? theme.palette.text.secondary : 'inherit',
              textDecoration: char === centerLetter && !isError ? 'underline' : 'none',
            }}
          >
            {char}
          </span>
        ))}
        <span style={{ 
          animation: 'blink 1s step-end infinite', 
          marginLeft: 2,
          color: theme.palette.text.primary,
          opacity: 0.5 
        }}>|</span>
      </Typography>
      <style>
        {`
          @keyframes blink {
            50% { opacity: 0; }
          }
        `}
      </style>
    </Box>
  );
};
