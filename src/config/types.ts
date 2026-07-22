export interface Definition {
  definition: string;
  example?: string;
  synonyms?: string[];
  antonyms?: string[];
}

export interface Meaning {
  partOfSpeech: string;
  definitions: Definition[];
  synonyms?: string[];
  antonyms?: string[];
}

export interface WordDef {
  word: string;
  phonetic?: string;
  audioUrl?: string;
  meanings: Meaning[];
}

export interface WordLengthCounts {
  [key: number]: number; // 3, 4, 5+
}

export interface GameState {
  letters: string[];
  centerLetter: string;
  discoveredWords: string[];
  score: number;
  currentStreak: number;
  maxStreak: number;
  wordLengthCounts: Record<number, number>;
  isShaking: boolean;
  isError: boolean;
  errorMessage: string | null;

  // Modals
  isMenuModalOpen: boolean;
  isRulesModalOpen: boolean;
  selectedWord: string | null; // For WordInfoModal

  // Actions
  shuffleLetters: () => void;
  addWord: (word: string, points: number) => void;
  triggerError: (message: string) => void;
  clearError: () => void;
  resetGame: (newLetters?: string[], newCenter?: string) => void;
  setMenuModalOpen: (isOpen: boolean) => void;
  setRulesModalOpen: (isOpen: boolean) => void;
  setSelectedWord: (word: string | null) => void;
  breakStreak: () => void;
}

export interface UIState {
  theme: 'dark' | 'light';
  isStatsOpen: boolean;
  isSettingsModalOpen: boolean;
  toggleTheme: () => void;
  setStatsOpen: (isOpen: boolean) => void;
  setSettingsModalOpen: (isOpen: boolean) => void;
}

export interface CacheState {
  // We store the first definition result if valid, or null if invalid
  wordCache: Record<string, WordDef | null>;
  cacheWord: (word: string, data: WordDef | null) => void;
  checkCache: (word: string) => WordDef | null | undefined;
}
