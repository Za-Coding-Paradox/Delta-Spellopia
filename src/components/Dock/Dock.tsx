import React, { useRef } from 'react';
import { Box, IconButton, Tooltip, useTheme } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import SettingsIcon from '@mui/icons-material/Settings';
import { useUIStore } from '@/store/uiStore';

export const Dock: React.FC = () => {
  const { theme, toggleTheme, setStatsOpen, setSettingsModalOpen } = useUIStore();
  const dockRef = useRef<HTMLDivElement>(null);
  const muiTheme = useTheme();

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dockRef.current) return;
    const icons = Array.from(dockRef.current.querySelectorAll('.dock-icon')) as HTMLElement[];
    
    icons.forEach((icon) => {
      const rect = icon.getBoundingClientRect();
      const iconCenterX = rect.left + rect.width / 2;
      const distance = Math.abs(e.clientX - iconCenterX);
      
      // Calculate scale based on distance from mouse
      const maxScale = 1.5;
      const range = 150; // Distance in pixels where scaling happens
      
      let scale = 1;
      if (distance < range) {
        scale = 1 + (maxScale - 1) * (1 - distance / range);
      }
      
      icon.style.transform = `scale(${scale}) translateY(${-(scale - 1) * 10}px)`;
    });
  };

  const handleMouseLeave = () => {
    if (!dockRef.current) return;
    const icons = Array.from(dockRef.current.querySelectorAll('.dock-icon')) as HTMLElement[];
    icons.forEach((icon) => {
      icon.style.transform = 'scale(1) translateY(0)';
    });
  };

  return (
    <Box
      ref={dockRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      sx={{
        position: 'fixed',
        top: 16,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: 2,
        padding: '12px 24px',
        background: muiTheme.palette.background.paper,
        border: `2px solid ${muiTheme.palette.divider}`,
        boxShadow: `8px 8px 0px 0px ${muiTheme.palette.divider}`,
        zIndex: 1000,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Tooltip title="Toggle Theme" arrow>
        <IconButton
          className="dock-icon"
          onClick={toggleTheme}
          sx={{
            transition: 'transform 0.1s',
            willChange: 'transform',
            color: 'text.primary',
            fontSize: '2rem',
          }}
        >
          {theme === 'dark' ? <LightModeIcon fontSize="inherit" /> : <DarkModeIcon fontSize="inherit" />}
        </IconButton>
      </Tooltip>
      
      <Tooltip title="Statistics" arrow>
        <IconButton
          className="dock-icon"
          onClick={() => setStatsOpen(true)}
          sx={{
            transition: 'transform 0.1s',
            willChange: 'transform',
            color: 'text.primary',
            fontSize: '2rem',
          }}
        >
          <LeaderboardIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>
      
      <Tooltip title="Settings" arrow>
        <IconButton
          className="dock-icon"
          onClick={() => setSettingsModalOpen(true)}
          sx={{
            transition: 'transform 0.1s',
            willChange: 'transform',
            color: 'text.primary',
            fontSize: '2rem',
          }}
        >
          <SettingsIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>
    </Box>
  );
};
