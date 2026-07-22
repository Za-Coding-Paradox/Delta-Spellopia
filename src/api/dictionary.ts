import axios from 'axios';
import { useCacheStore } from '@/store/cacheStore';
import type { WordDef } from '@/config/types';

const inFlightRequests = new Map<string, Promise<WordDef | null>>();

export const checkWordValidity = async (word: string): Promise<WordDef | null> => {
  const normalizedWord = word.trim().toLowerCase();
  
  if (!normalizedWord) return null;

  const cacheStore = useCacheStore.getState();
  const cachedResult = cacheStore.checkCache(normalizedWord);
  
  if (cachedResult !== undefined) {
    console.info(`[API Cache] Hit for word: ${normalizedWord}`);
    return cachedResult;
  }

  if (inFlightRequests.has(normalizedWord)) {
    console.info(`[API In-Flight] Deduplicating request for: ${normalizedWord}`);
    return inFlightRequests.get(normalizedWord) as Promise<WordDef | null>;
  }

  const requestPromise = (async () => {
    console.time(`[API Request] ${normalizedWord}`);
    try {
      const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${normalizedWord}`);
      
      if (response.status === 200 && response.data && response.data.length > 0) {
        console.log('[API Raw Response]', JSON.stringify(response.data, null, 2));
        const entry = response.data[0];
        
        // Find audio URL
        let audioUrl = undefined;
        if (entry.phonetics && entry.phonetics.length > 0) {
          const phoneticWithAudio = entry.phonetics.find((p: any) => p.audio && p.audio.length > 0);
          if (phoneticWithAudio) {
            audioUrl = phoneticWithAudio.audio;
          }
        }

        const wordData: WordDef = {
          word: entry.word,
          phonetic: entry.phonetic,
          audioUrl,
          meanings: entry.meanings.map((m: any) => ({
            partOfSpeech: m.partOfSpeech,
            synonyms: m.synonyms || [],
            antonyms: m.antonyms || [],
            definitions: m.definitions.map((d: any) => ({
              definition: d.definition,
              example: d.example,
              synonyms: d.synonyms || [],
              antonyms: d.antonyms || [],
            }))
          })),
        };
        
        console.info(`[API Success] Valid word found: ${normalizedWord}`);
        cacheStore.cacheWord(normalizedWord, wordData);
        return wordData;
      }
      
      console.warn(`[API Info] Invalid word or empty data: ${normalizedWord}`);
      cacheStore.cacheWord(normalizedWord, null);
      return null;
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        console.warn(`[API 404] Word not found: ${normalizedWord}`);
        cacheStore.cacheWord(normalizedWord, null);
        return null;
      }
      console.error(`[API Error] Failed to fetch: ${normalizedWord}`, error);
      return null;
    } finally {
      console.timeEnd(`[API Request] ${normalizedWord}`);
      inFlightRequests.delete(normalizedWord);
    }
  })();

  inFlightRequests.set(normalizedWord, requestPromise);
  return requestPromise;
};
