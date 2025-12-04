/**
 * Letter generation and management composable
 */

import { getTodayKey, isToday } from '~/utils/date';
import { getLocalStorageItem, setLocalStorageItem, removeLocalStorageItem, type LetterData } from '~/composables/useLocalStorage';
import { getBrowserLanguage } from '~/utils/language';

export interface LetterResponse {
  letter: string;
  generatedAt: string;
  model: string;
}

/**
 * Get today's letter from localStorage
 */
export function getTodayLetter(): LetterData | null {
  const key = getTodayKey();
  const data = getLocalStorageItem<LetterData>(key);

  if (!data) return null;

  // Verify it's actually today's letter
  if (!isToday(data.date)) {
    // Clean up old data
    removeLocalStorageItem(key);
    return null;
  }

  return data;
}

/**
 * Save letter to localStorage
 */
export function saveLetter(letter: string, generatedAt: string): void {
  const key = getTodayKey();
  const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  const data: LetterData = {
    letter,
    generatedAt,
    date
  };

  setLocalStorageItem(key, data);
}

/**
 * Generate a new letter via API
 * Automatically detects browser language and sends to API
 * @param feeling - Optional feeling text from user (not persisted)
 */
export async function generateLetter(feeling?: string): Promise<LetterResponse> {
  // Detect browser language
  const language = getBrowserLanguage();

  const response = await $fetch<LetterResponse>('/api/letter', {
    method: 'POST',
    body: {
      language,
      feeling: feeling?.trim() || undefined // Only send if provided, don't send empty strings
    }
  });

  return response;
}

