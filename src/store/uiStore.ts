import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UIState } from '@/config/types';

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      theme: 'light', // Default to light for Google Pixel vibe
      isStatsOpen: false,
      isSettingsModalOpen: false,
      toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
      setStatsOpen: (isOpen) => set({ isStatsOpen: isOpen }),
      setSettingsModalOpen: (isOpen) => set({ isSettingsModalOpen: isOpen }),
    }),
    {
      name: 'spellopia-ui-storage-v2',
    }
  )
);
