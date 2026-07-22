import React from 'react';
import { Button } from '@mui/material';
import { useUIStore } from '@/store/uiStore';
import { StatsPanel } from '@/components/Game/StatsPanel';
import { BaseModal } from '@/components/Modals/BaseModal';

/**
 * Renders the statistics modal to display player progress and scores.
 * 
 * @returns {React.ReactElement} The StatsModal component.
 */
export const StatsModal: React.FC = () => {
  const { isStatsOpen, setStatsOpen } = useUIStore();

  return (
    <BaseModal 
      open={isStatsOpen} 
      onClose={() => setStatsOpen(false)}
      title="Statistics"
      actions={<Button onClick={() => setStatsOpen(false)}>Close</Button>}
    >
      <StatsPanel />
    </BaseModal>
  );
};
