import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { GameState } from '@/config/types';

/**
 * A hardcoded dictionary of valid 9-letter pangrams used to generate the game board.
 */
const PANGRAMS = [
  'EDUCATION',
  'WONDERFUL',
  'BEAUTIFUL',
  'IMPORTANT',
  'KNOWLEDGE',
  'SOMETHING',
  'COMPUTERS',
  'DISCOVERY',
  'CHEMISTRY'
];

/**
 * Selects a random pangram, shuffles its letters, and selects a center letter.
 * 
 * @returns {{ letters: string[], centerLetter: string }} The generated game set.
 */
const getRandomPangram = () => {
  const word = PANGRAMS[Math.floor(Math.random() * PANGRAMS.length)];
  const letters = word.split('');
  
  // Count frequency to find unique letters
  const counts = letters.reduce((acc, l) => {
    acc[l] = (acc[l] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // Center letter must appear exactly once
  const uniqueLetters = letters.filter(l => counts[l] === 1);
  const centerLetter = uniqueLetters[Math.floor(Math.random() * uniqueLetters.length)];
  
  // Remove exactly one instance of the center letter from the grid
  const otherLetters = letters.filter(l => l !== centerLetter);
  
  // Shuffle otherLetters
  for (let i = otherLetters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [otherLetters[i], otherLetters[j]] = [otherLetters[j], otherLetters[i]];
  }
  
  // Insert centerLetter precisely at index 4 (center of 3x3)
  const shuffled = [
    ...otherLetters.slice(0, 4),
    centerLetter,
    ...otherLetters.slice(4)
  ];
  
  return { letters: shuffled, centerLetter };
};

/**
 * Zustand store for managing the core game state, including letters, scoring, and current progress.
 * Persists data to local storage so users can resume their game.
 */
export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      letters: ['A', 'P', 'E', 'L', 'I', 'N', 'X', 'O', 'T'],
      centerLetter: 'P',
      discoveredWords: [],
      score: 0,
      currentStreak: 0,
      maxStreak: 0,
      wordLengthCounts: {},
      isShaking: false,
      isError: false,
      errorMessage: null,

      // Modals
      isMenuModalOpen: false,
      isRulesModalOpen: false,
      selectedWord: null,

      shuffleLetters: () => {
        const { letters, centerLetter } = get();
        const otherLetters = letters.filter((l) => l !== centerLetter);
        for (let i = otherLetters.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [otherLetters[i], otherLetters[j]] = [otherLetters[j], otherLetters[i]];
        }
        const shuffled = [
          ...otherLetters.slice(0, 4),
          centerLetter,
          ...otherLetters.slice(4),
        ];
        set({ letters: shuffled });
      },

      addWord: (word, points) =>
        set((state) => {
          if (state.discoveredWords.includes(word)) return state;
          
          const newStreak = state.currentStreak + 1;
          const newMaxStreak = Math.max(state.maxStreak, newStreak);
          
          const len = word.length;
          const bucket = len >= 5 ? 5 : len;
          const newCounts = { ...state.wordLengthCounts };
          newCounts[bucket] = (newCounts[bucket] || 0) + 1;

          return {
            discoveredWords: [word, ...state.discoveredWords],
            score: state.score + points,
            currentStreak: newStreak,
            maxStreak: newMaxStreak,
            wordLengthCounts: newCounts,
          };
        }),

      breakStreak: () => set({ currentStreak: 0 }),

      triggerError: (message) => {
        set({ isError: true, isShaking: true, errorMessage: message, currentStreak: 0 });
        setTimeout(() => {
          set({ isShaking: false });
        }, 500);
      },

      clearError: () => set({ isError: false, errorMessage: null }),

      resetGame: (newLetters?: string[], newCenter?: string) => {
        let letters = newLetters;
        let centerLetter = newCenter;
        
        if (!letters || !centerLetter) {
          const random = getRandomPangram();
          letters = random.letters;
          centerLetter = random.centerLetter;
        }

        set({
          letters,
          centerLetter,
          discoveredWords: [],
          score: 0,
          currentStreak: 0,
          wordLengthCounts: {},
          isError: false,
          isShaking: false,
          errorMessage: null,
          isMenuModalOpen: false,
          isRulesModalOpen: false,
          selectedWord: null,
        });
      },

      setMenuModalOpen: (isOpen) => set({ isMenuModalOpen: isOpen }),
      setRulesModalOpen: (isOpen) => set({ isRulesModalOpen: isOpen }),
      setSelectedWord: (word) => set({ selectedWord: word }),
    }),
    {
      name: 'spellopia-game-storage-v2',
      partialize: (state) => ({
        letters: state.letters,
        centerLetter: state.centerLetter,
        discoveredWords: state.discoveredWords,
        score: state.score,
        currentStreak: state.currentStreak,
        maxStreak: state.maxStreak,
        wordLengthCounts: state.wordLengthCounts,
      }),
    }
  )
);
