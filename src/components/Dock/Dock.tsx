import React, { useRef } from 'react';
import { Box, IconButton, Tooltip, useTheme } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import SettingsIcon from '@mui/icons-material/Settings';
import { useUIStore } from '@/store/uiStore';

/**
 * Renders the responsive macOS-like dock at the top of the screen.
 * The dock scales its icons dynamically based on mouse proximity.
 * 
 * @returns {React.ReactElement} The Dock component.
 */
export const Dock: React.FC = () => {
  const { theme, toggleTheme, setStatsOpen, setSettingsModalOpen } = useUIStore();
  const dockRef = useRef<HTMLDivElement>(null);
  const muiTheme = useTheme();

  /**
   * Configuration dictionary mapping dock keys to their respective properties.
   */
  const DOCK_ITEMS: Record<string, { label: string; icon: React.ReactNode; action: () => void }> = {
    themeToggle: {
      label: 'Toggle Theme',
      icon: theme === 'dark' ? <LightModeIcon fontSize="inherit" /> : <DarkModeIcon fontSize="inherit" />,
      action: toggleTheme,
    },
    statistics: {
      label: 'Statistics',
      icon: <LeaderboardIcon fontSize="inherit" />,
      action: () => setStatsOpen(true),
    },
    settings: {
      label: 'Settings',
      icon: <SettingsIcon fontSize="inherit" />,
      action: () => setSettingsModalOpen(true),
    },
  };

  /**
   * Handles dynamic icon scaling based on mouse proximity to each icon's center.
   * 
   * @param {React.MouseEvent} e - The mouse event.
   */
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

  /**
   * Resets all icon scales when the mouse leaves the dock area.
   */
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
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: `1px solid ${muiTheme.palette.divider}`,
        boxShadow: muiTheme.palette.mode === 'light' 
          ? '0 8px 32px rgba(0,0,0,0.08)' 
          : '0 8px 32px rgba(0,0,0,0.5)',
        borderRadius: '50px', // Extra rounded for dock look

        zIndex: 1000,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {Object.entries(DOCK_ITEMS).map(([key, item]) => (
        <Tooltip key={key} title={item.label} arrow>
          <IconButton
            className="dock-icon"
            onClick={item.action}
            sx={{
              transition: 'transform 0.1s',
              willChange: 'transform',
              color: 'text.primary',
              fontSize: '2rem',
            }}
          >
            {item.icon}
          </IconButton>
        </Tooltip>
      ))}
    </Box>
  );
};
