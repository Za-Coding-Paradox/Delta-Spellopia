import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { useUIStore } from '@/store/uiStore';
import { createAppTheme } from '@/config/theme';
import { MenuPage } from '@/pages/MenuPage';
import { GamePage } from '@/pages/GamePage';
import './index.css';

/**
 * The main application component that sets up routing, global theme, and baseline CSS.
 * 
 * @returns {React.ReactElement} The root application component.
 */
function App() {
  const { theme } = useUIStore();
  const muiTheme = createAppTheme(theme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MenuPage />} />
          <Route path="/game" element={<GamePage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
