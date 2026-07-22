import React from 'react';
import { Typography, Button } from '@mui/material';
import { useGameStore } from '@/store/gameStore';
import { BaseModal } from '@/components/Modals/BaseModal';

/**
 * Renders the rules modal explaining how to play the game.
 * 
 * @returns {React.ReactElement} The RulesModal component.
 */
export const RulesModal: React.FC = () => {
  const { isRulesModalOpen, setRulesModalOpen } = useGameStore();

  return (
    <BaseModal 
      open={isRulesModalOpen} 
      onClose={() => setRulesModalOpen(false)}
      title="How to Play"
      maxWidth="xs"
      actions={<Button onClick={() => setRulesModalOpen(false)}>Got it</Button>}
    >
      <Typography variant="body1" sx={{ mb: 2 }}>
        Create words using letters from the 9-letter grid.
      </Typography>
      <Typography variant="body2" component="ul" sx={{ pl: 2 }}>
        <li>Words must contain at least 4 letters.</li>
        <li>Words must include the center letter.</li>
        <li>Letters can be used more than once.</li>
        <li>Words must be found in the dictionary.</li>
      </Typography>
    </BaseModal>
  );
};
