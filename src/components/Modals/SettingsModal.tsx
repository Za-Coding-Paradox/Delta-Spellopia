import React from 'react';
import { Typography, Button } from '@mui/material';
import { useUIStore } from '@/store/uiStore';
import { BaseModal } from '@/components/Modals/BaseModal';

/**
 * Renders the settings modal for application configuration.
 * 
 * @returns {React.ReactElement} The SettingsModal component.
 */
export const SettingsModal: React.FC = () => {
  const { isSettingsModalOpen, setSettingsModalOpen } = useUIStore();

  return (
    <BaseModal 
      open={isSettingsModalOpen} 
      onClose={() => setSettingsModalOpen(false)}
      title="Settings"
      maxWidth="xs"
      actions={<Button onClick={() => setSettingsModalOpen(false)}>Close</Button>}
    >
      <Typography variant="body1" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
        Under working... Check back later!
      </Typography>
    </BaseModal>
  );
};
