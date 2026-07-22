import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CacheState } from '@/config/types';

export const useCacheStore = create<CacheState>()(
  persist(
    (set, get) => ({
      wordCache: {},
      cacheWord: (word, data) =>
        set((state) => ({
          wordCache: { ...state.wordCache, [word]: data },
        })),
      checkCache: (word) => get().wordCache[word],
    }),
    {
      name: 'spellopia-word-cache-v2',
    }
  )
);
