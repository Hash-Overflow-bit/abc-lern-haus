// ============================================================================
// German TTS Engine — Senior-Level Implementation
// ============================================================================
// Architecture:
//   1. NEVER speak raw UI text (e.g., "Aa", "A a", "A = Apfel").
//   2. Map every letter to a single PRONOUNCEABLE German phoneme unit.
//   3. Force de-DE voice selection with async voice loading.
//   4. Phoneme strings are written as natural German syllables so the
//      TTS engine reads them as continuous sounds, not individual letters.
// ============================================================================

/**
 * German letter name pronunciation map.
 *
 * KEY DESIGN DECISION: Each value is written as a **German-pronounceable word/syllable**
 * that the de-DE TTS engine will read as one continuous unit.
 *
 * ❌ BAD:  "tseh" → TTS reads "T, S, E, H" (4 letters)
 * ✅ GOOD: "Zeh"  → TTS reads it as one syllable (German word for "toe")
 *
 * We use actual German words/syllables wherever possible so the TTS engine
 * doesn't try to spell them out.
 */
const GERMAN_LETTER_SOUNDS: Record<string, string> = {
  // Standard alphabet — German letter names as pronounceable words
  A: "Ah",
  B: "Beh",
  C: "Zeh",        // German pronunciation of C = "tsee" → "Zeh" is a real German word
  D: "Deh",
  E: "Eh",
  F: "Eff",
  G: "Geh",
  H: "Hah",
  I: "Ih",
  J: "Jott",
  K: "Kah",
  L: "Ell",
  M: "Emm",
  N: "Enn",
  O: "Oh",
  P: "Peh",
  Q: "Kuh",
  R: "Err",
  S: "Ess",
  T: "Teh",
  U: "Uh",
  V: "Fau",
  W: "Weh",
  X: "Iks",
  Y: "Üpsilon",
  Z: "Zett",

  // Umlaute & Sonderbuchstaben
  "Ä": "Äh",
  "Ö": "Öh",
  "Ü": "Üh",
  "ß": "Eszett",
  "ss": "Doppel Ess",
};

// ============================================================================
// Voice Selection — Force de-DE with priority scoring
// ============================================================================

/** Priority keywords for voice selection, highest priority first */
const PREFERRED_VOICE_KEYWORDS = [
  "google deutsch",
  "google de",
  "microsoft hedda",
  "microsoft katja",
  "microsoft stefan",
  "microsoft conrad",
  "microsoft hans",
  "microsoft hilde",
  "anna",       // macOS/iOS premium German voice
  "petra",
  "markus",
  "yannick",
  "de-de",
  "de_de",
  "deutsch",
  "german",
];

let _cachedVoice: SpeechSynthesisVoice | null = null;
let _voicesLoaded = false;

function scoreVoice(v: SpeechSynthesisVoice): number {
  const name = v.name.toLowerCase();
  const lang = v.lang.toLowerCase().replace("_", "-");

  // Must be a German voice
  if (lang !== "de" && !lang.startsWith("de-")) return -1;

  // Score by keyword match priority
  for (let i = 0; i < PREFERRED_VOICE_KEYWORDS.length; i++) {
    if (name.includes(PREFERRED_VOICE_KEYWORDS[i])) {
      return PREFERRED_VOICE_KEYWORDS.length - i + 10;
    }
  }

  // Base score for any German voice
  return 1;
}

function pickBestGermanVoice(): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return null;

  const all = window.speechSynthesis.getVoices();
  if (all.length === 0) return null;

  const german = all.filter((v) => {
    if (!v.lang) return false;
    const lang = v.lang.toLowerCase().replace("_", "-");
    return lang === "de" || lang.startsWith("de-");
  });

  if (german.length === 0) return null;

  // Sort by score descending, then prefer cloud (non-local) voices
  german.sort((a, b) => {
    const diff = scoreVoice(b) - scoreVoice(a);
    if (diff !== 0) return diff;
    // Tiebreak: prefer cloud voices for better quality
    if (a.localService !== b.localService) return a.localService ? 1 : -1;
    return 0;
  });

  return german[0];
}

function refreshVoice() {
  const v = pickBestGermanVoice();
  if (v) {
    _cachedVoice = v;
    _voicesLoaded = true;
  }
}

// Initialize voice selection — handle async loading in Chrome/Edge
if (typeof window !== "undefined" && "speechSynthesis" in window) {
  // Try immediately (Firefox/Safari may have voices ready)
  refreshVoice();

  // Chrome loads voices async — listen for voiceschanged
  window.speechSynthesis.addEventListener("voiceschanged", () => {
    refreshVoice();
  });
}

// ============================================================================
// Text Normalization — Prevent double-reading and map to phonemes
// ============================================================================

/**
 * Normalizes input text to prevent double-pronunciation and maps single
 * letters to their German phonetic names.
 *
 * Input patterns handled:
 *   "A a"    → speaks letter name "Ah"
 *   "Aa"     → speaks letter name "Ah"
 *   "A, a"   → speaks letter name "Ah"
 *   "A"      → speaks letter name "Ah"
 *   "Apfel"  → speaks word "Apfel" (no mapping needed)
 */
export function cleanSpokenText(text: string): string {
  if (!text) return "";
  let t = text.trim();

  // 1. Strip number prefixes like "0 null" → "null"
  const numWordMatch = t.match(/^\d+\s+(.+)$/);
  if (numWordMatch) {
    t = numWordMatch[1];
  }

  // 2. Detect and collapse double-letter patterns: "A a", "Aa", "A, a", "Ä ä"
  const doubleLetterMatch = t.match(/^(\p{L})\s*[,|\s]?\s*(\p{L})$/u);
  if (doubleLetterMatch) {
    const first = doubleLetterMatch[1];
    const second = doubleLetterMatch[2];
    if (first.toLowerCase() === second.toLowerCase()) {
      t = first.toUpperCase(); // Normalize to uppercase for lookup
    }
  }

  // 3. Single letter → map to German phonetic name
  if (/^\p{L}$/u.test(t)) {
    const key = t.toUpperCase();
    if (GERMAN_LETTER_SOUNDS[key]) {
      return GERMAN_LETTER_SOUNDS[key];
    }
  }

  // 4. Known multi-char special cases (ss, ß)
  const lowerT = t.toLowerCase();
  if (lowerT === "ss" && GERMAN_LETTER_SOUNDS["ss"]) {
    return GERMAN_LETTER_SOUNDS["ss"];
  }

  return t;
}

// ============================================================================
// Core TTS Function
// ============================================================================

/**
 * Speak text in German using the Web Speech API.
 *
 * Usage:
 *   speakDE("A")          → pronounces "Ah" (letter name)
 *   speakDE("Apfel")      → pronounces "Apfel" (whole word)
 *   speakDE("Aa")         → pronounces "Ah" (collapsed to single letter)
 *   speakDE("Super!")      → pronounces "Super!" (feedback word)
 */
export function speakDE(text: string) {
  if (typeof window === "undefined") return;
  if (!("speechSynthesis" in window)) return;

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  // Clean and map text to correct phonetic German pronunciation
  const spokenText = cleanSpokenText(text);
  if (!spokenText) return;

  const utterance = new SpeechSynthesisUtterance(spokenText);

  // ✅ FORCE German language — this is critical even without a German voice
  utterance.lang = "de-DE";
  utterance.rate = 0.85;
  utterance.pitch = 1.0;
  utterance.volume = 1.0;

  // ✅ Assign German voice if available
  if (_cachedVoice) {
    utterance.voice = _cachedVoice;
  } else {
    // Retry voice selection in case voices loaded after init
    refreshVoice();
    if (_cachedVoice) {
      utterance.voice = _cachedVoice;
    }
  }

  window.speechSynthesis.speak(utterance);
}

// ============================================================================
// Warmup — Call on app boot to trigger async voice loading early
// ============================================================================

/** Trigger voice loading early so voices are ready when user first clicks */
export function warmupSpeech() {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

  // Force browser to load voice list
  window.speechSynthesis.getVoices();

  // Retry voice selection after a short delay (Chrome quirk)
  setTimeout(() => {
    refreshVoice();
  }, 100);
}
