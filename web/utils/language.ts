/**
 * Language detection utilities
 * Detects browser language and extracts language code
 */

/**
 * Supported languages mapping
 * Maps language codes to language names for OpenAI prompt
 * OpenAI supports many languages, so we include a broad set
 */
const SUPPORTED_LANGUAGES: Record<string, string> = {
  'en': 'English',
  'vi': 'Vietnamese',
  'es': 'Spanish',
  'fr': 'French',
  'de': 'German',
  'it': 'Italian',
  'pt': 'Portuguese',
  'ja': 'Japanese',
  'ko': 'Korean',
  'zh': 'Chinese',
  'ar': 'Arabic',
  'ru': 'Russian',
  'hi': 'Hindi',
  'th': 'Thai',
  'id': 'Indonesian',
  'nl': 'Dutch',
  'pl': 'Polish',
  'tr': 'Turkish',
  'sv': 'Swedish',
  'da': 'Danish',
  'no': 'Norwegian',
  'fi': 'Finnish',
  'cs': 'Czech',
  'hu': 'Hungarian',
  'ro': 'Romanian',
  'uk': 'Ukrainian',
  'el': 'Greek',
  'he': 'Hebrew',
  'bn': 'Bengali',
  'ms': 'Malay',
  'ta': 'Tamil',
  'te': 'Telugu',
  'ur': 'Urdu',
  'fa': 'Persian',
  'sw': 'Swahili',
  'af': 'Afrikaans',
  'bg': 'Bulgarian',
  'hr': 'Croatian',
  'sk': 'Slovak',
  'sl': 'Slovenian',
  'sr': 'Serbian',
  'et': 'Estonian',
  'lv': 'Latvian',
  'lt': 'Lithuanian',
  'is': 'Icelandic',
  'ga': 'Irish',
  'mt': 'Maltese',
  'cy': 'Welsh',
  'eu': 'Basque',
  'ca': 'Catalan',
  'gl': 'Galician',
  'mk': 'Macedonian',
  'sq': 'Albanian',
  'bs': 'Bosnian',
  'be': 'Belarusian',
  'az': 'Azerbaijani',
  'ka': 'Georgian',
  'hy': 'Armenian',
  'kk': 'Kazakh',
  'ky': 'Kyrgyz',
  'uz': 'Uzbek',
  'mn': 'Mongolian',
  'ne': 'Nepali',
  'si': 'Sinhala',
  'my': 'Myanmar',
  'km': 'Khmer',
  'lo': 'Lao',
  'am': 'Amharic',
  'zu': 'Zulu',
  'xh': 'Xhosa',
  'yo': 'Yoruba',
  'ig': 'Igbo',
  'ha': 'Hausa',
  'so': 'Somali',
  'rw': 'Kinyarwanda',
  'sn': 'Shona',
  'st': 'Sesotho',
  'tn': 'Setswana',
  've': 'Venda',
  'ts': 'Tsonga',
  'ss': 'Swati',
  'nr': 'Ndebele',
  'nso': 'Northern Sotho'
};

/**
 * Extract language code from browser language string
 * Examples: "vi-VN" -> "vi", "en-US" -> "en", "fr" -> "fr"
 */
export function extractLanguageCode(browserLanguage: string): string {
  if (!browserLanguage) return 'en';

  // Extract base language code (before hyphen)
  const code = browserLanguage.split('-')[0].toLowerCase();
  return code;
}

/**
 * Get browser language code
 * Returns language code from navigator.language or navigator.languages[0]
 * Falls back to 'en' if not available
 */
export function getBrowserLanguage(): string {
  if (typeof window === 'undefined') {
    return 'en'; // Server-side fallback
  }

  // Try navigator.language first
  const browserLang = navigator.language || navigator.languages?.[0] || 'en';
  return extractLanguageCode(browserLang);
}

/**
 * Get language name for OpenAI prompt
 * Returns language name if supported, otherwise returns 'English' as fallback
 */
export function getLanguageName(languageCode: string): string {
  const code = languageCode.toLowerCase();
  return SUPPORTED_LANGUAGES[code] || 'English';
}

/**
 * Check if language is supported
 */
export function isLanguageSupported(languageCode: string): boolean {
  const code = languageCode.toLowerCase();
  return code in SUPPORTED_LANGUAGES;
}

