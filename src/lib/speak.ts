// Central phonetic pronunciation mapping for German letters
const letterProns: Record<string, string> = {
  A: "ah",
  B: "beh",
  C: "tseh",
  D: "deh",
  E: "eh",
  F: "eff",
  G: "geh",
  H: "hah",
  I: "ih",
  J: "jot",
  K: "kah",
  L: "ell",
  M: "emm",
  N: "enn",
  O: "oh",
  P: "peh",
  Q: "kuh",
  R: "err",
  S: "ess",
  T: "teh",
  U: "uh",
  V: "vau",
  W: "weh",
  X: "ix",
  Y: "ypsilon",
  Z: "zett",
  "Ä": "äh",
  "Ö": "öh",
  "Ü": "üh",
  "ß": "eszett",
  ss: "ess"
};

// Priority order: cloud/premium voices ranked first
const PREFERRED_VOICE_KEYWORDS = [
  "google deutsch",
  "google de",
  "microsoft hedda",
  "microsoft katja",
  "microsoft stefan",
  "microsoft hans",
  "microsoft hilde",
  "anna", // macOS/iOS premium German voice
  "markus",
  "yannick",
  "de-de",
  "de_de",
  "deutsch",
  "german",
  "de",
];

let _cachedVoice: SpeechSynthesisVoice | null = null;

function scoreVoice(v: SpeechSynthesisVoice): number {
  const name = v.name.toLowerCase();
  for (let i = 0; i < PREFERRED_VOICE_KEYWORDS.length; i++) {
    if (name.includes(PREFERRED_VOICE_KEYWORDS[i])) {
      return PREFERRED_VOICE_KEYWORDS.length - i;
    }
  }
  return 0;
}

function pickBestGermanVoice(): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return null;

  const all = window.speechSynthesis.getVoices();
  const german = all.filter((v) => {
    if (!v.lang) return false;
    const lang = v.lang.toLowerCase().replace("_", "-");
    return lang === "de" || lang.startsWith("de-");
  });

  if (german.length === 0) return null;

  // Sort by preference score descending
  german.sort((a, b) => {
    const diff = scoreVoice(b) - scoreVoice(a);
    if (diff !== 0) return diff;
    // Tiebreak: prefer non-local (cloud) voices for better quality
    return a.localService === b.localService ? 0 : b.localService ? -1 : 1;
  });

  return german[0];
}

function ensureVoice(): SpeechSynthesisVoice | null {
  if (!_cachedVoice) {
    _cachedVoice = pickBestGermanVoice();
  }
  return _cachedVoice;
}

// Update voice list dynamically (Chrome loads voices asynchronously in multiple events)
if (typeof window !== "undefined" && "speechSynthesis" in window) {
  _cachedVoice = pickBestGermanVoice();
  window.speechSynthesis.addEventListener("voiceschanged", () => {
    _cachedVoice = pickBestGermanVoice();
  });
}

/**
 * Normalizes input text to prevent double-pronunciation issues (e.g. "Aa", "A a", "0 null")
 * and converts single German letters to their clear phonetic representations in lowercase.
 */
export function cleanSpokenText(text: string): string {
  if (!text) return "";
  let t = text.trim();

  // 1. Normalize double letter patterns like "A a", "Aa", "A, a", "Ä ä"
  const doubleLetterMatch = t.match(/^(\p{L})\s*[,|\s]?\s*(\p{L})$/ui);
  if (doubleLetterMatch) {
    const first = doubleLetterMatch[1];
    const second = doubleLetterMatch[2];
    if (first.toLowerCase() === second.toLowerCase()) {
      t = first; // Use only the single letter
    }
  }

  // 2. If it is a single letter, convert it to lowercase phonetic spelling
  if (/^\p{L}$/u.test(t)) {
    const key = t.toUpperCase();
    if (letterProns[key]) {
      return letterProns[key];
    }
  }

  return t;
}

export function speakDE(text: string) {
  if (typeof window === "undefined") return;
  if (!("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();

  // Clean and map text to correct phonetic German pronunciation
  const cleanedText = cleanSpokenText(text);
  if (!cleanedText) return;

  const utterance = new SpeechSynthesisUtterance(cleanedText);
  utterance.lang = "de-DE";
  utterance.rate = 0.82;
  utterance.pitch = 1.0;
  utterance.volume = 1.0;

  const voice = ensureVoice();
  if (voice) {
    utterance.voice = voice;
  }

  window.speechSynthesis.speak(utterance);
}

/** Call once on app boot to trigger async voice loading early */
export function warmupSpeech() {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.getVoices();
}
