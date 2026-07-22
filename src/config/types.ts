/**
 * Represents a specific definition of a word.
 */
export interface Definition {
  definition: string;
  example?: string;
  synonyms?: string[];
  antonyms?: string[];
}

/**
 * Represents a meaning of a word, categorized by part of speech.
 */
export interface Meaning {
  partOfSpeech: string;
  definitions: Definition[];
  synonyms?: string[];
  antonyms?: string[];
}

/**
 * Complete definition object for a word returned by the dictionary API.
 */
export interface WordDef {
  word: string;
  phonetic?: string;
  audioUrl?: string;
  meanings: Meaning[];
}

/**
 * Tracks the count of discovered words grouped by their length.
 */
export interface WordLengthCounts {
  [key: number]: number; // 3, 4, 5+
}

/**
 * The core state and actions for the game logic.
 */
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

/**
 * The state and actions for application-wide UI and settings.
 */
export interface UIState {
  theme: 'dark' | 'light';
  isStatsOpen: boolean;
  isSettingsModalOpen: boolean;
  toggleTheme: () => void;
  setStatsOpen: (isOpen: boolean) => void;
  setSettingsModalOpen: (isOpen: boolean) => void;
}

/**
 * The state and actions for caching dictionary API responses.
 */
export interface CacheState {
  // We store the first definition result if valid, or null if invalid
  wordCache: Record<string, WordDef | null>;
  cacheWord: (word: string, data: WordDef | null) => void;
  checkCache: (word: string) => WordDef | null | undefined;
}
