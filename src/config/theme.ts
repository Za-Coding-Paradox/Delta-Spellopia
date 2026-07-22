import { createTheme } from '@mui/material/styles';

/**
 * Generates Material UI design tokens based on the current color mode.
 * 
 * @param {'light' | 'dark'} mode - The current application color mode.
 * @returns {ThemeOptions} The configured design tokens.
 */
const getDesignTokens = (mode: 'light' | 'dark') => ({
  palette: {
    mode,
    primary: {
      main: mode === 'light' ? '#000000' : '#FFFFFF',
      contrastText: mode === 'light' ? '#FFFFFF' : '#000000',
    },
    background: {
      default: mode === 'light' ? '#F5F5F7' : '#000000', // Apple-esque background
      paper: mode === 'light' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(30, 30, 30, 0.7)', // Translucent paper
    },
    text: {
      primary: mode === 'light' ? '#000000' : '#FFFFFF',
      secondary: mode === 'light' ? '#555555' : '#AAAAAA',
    },
    error: {
      main: '#000000', // Sharp contrast error (will use styling for flash)
    },
    divider: mode === 'light' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.1)',
  },
  typography: {
    fontFamily: '"Inter", "Product Sans", "Roboto", "Helvetica Neue", Arial, sans-serif',
    button: {
      textTransform: 'none' as const,
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 5, // Exact requirement from user
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 5,
          padding: '10px 24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          border: `1px solid ${mode === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)'}`,
          '&:hover': {
            boxShadow: 'none',
          },
        },
        contained: {
          backgroundColor: mode === 'light' ? '#000000' : '#FFFFFF',
          color: mode === 'light' ? '#FFFFFF' : '#000000',
          '&:hover': {
            backgroundColor: mode === 'light' ? '#333333' : '#DDDDDD',
          },
        },
        outlined: {
          backgroundColor: 'transparent',
          color: mode === 'light' ? '#000000' : '#FFFFFF',
          '&:hover': {
            backgroundColor: mode === 'light' ? '#EEEEEE' : '#222222',
          },
        }
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: `1px solid ${mode === 'light' ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.1)'}`,
          boxShadow: mode === 'light' 
            ? '0 8px 32px rgba(0,0,0,0.08)' 
            : '0 8px 32px rgba(0,0,0,0.5)',
        },
        elevation0: {
          boxShadow: 'none',
        }
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 5,
          fontWeight: 600,
          border: `1px solid ${mode === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)'}`,
          color: mode === 'light' ? '#000000' : '#FFFFFF',
          backdropFilter: 'blur(10px)',
        },
        outlined: {
          backgroundColor: mode === 'light' ? '#FFFFFF' : '#1E1E1E',
          '&:hover': {
            backgroundColor: mode === 'light' ? '#F0F0F0' : '#333333',
          }
        }
      }
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          border: `1px solid ${mode === 'light' ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.1)'}`,
          boxShadow: mode === 'light' 
            ? '0 24px 64px rgba(0,0,0,0.12)' 
            : '0 24px 64px rgba(0,0,0,0.6)',
          borderRadius: 5,
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          backgroundColor: mode === 'light' ? 'rgba(255,255,255,0.8)' : 'rgba(30,30,30,0.8)',
        }
      }
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage: mode === 'light' 
            ? 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' 
            : 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
          backgroundAttachment: 'fixed',
          minHeight: '100vh',
        }
      }
    }
  },
});

/**
 * Creates and returns a fully configured Material UI theme instance.
 * 
 * @param {'light' | 'dark'} mode - The current application color mode.
 * @returns {Theme} The instantiated Material UI theme.
 */
export const createAppTheme = (mode: 'light' | 'dark') => createTheme(getDesignTokens(mode));
