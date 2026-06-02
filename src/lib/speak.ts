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
];

let _cachedVoice: SpeechSynthesisVoice | null = null;
let _voicesLoaded = false;

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
  const all = window.speechSynthesis.getVoices();
  const german = all.filter((v) => v.lang.startsWith("de"));
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
  if (_cachedVoice) return _cachedVoice;
  _cachedVoice = pickBestGermanVoice();
  return _cachedVoice;
}

// Pre-load voice list as early as possible (Chrome loads voices async)
if (typeof window !== "undefined" && "speechSynthesis" in window) {
  if (window.speechSynthesis.getVoices().length > 0) {
    _voicesLoaded = true;
    _cachedVoice = pickBestGermanVoice();
  } else {
    window.speechSynthesis.addEventListener("voiceschanged", () => {
      if (!_voicesLoaded) {
        _voicesLoaded = true;
        _cachedVoice = pickBestGermanVoice();
      }
    });
  }
}

export function speakDE(text: string) {
  if (typeof window === "undefined") return;

  // Speak immediately in the current user gesture. This is the most reliable
  // production path across browsers and mobile devices.
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "de-DE";
  utterance.rate = 0.82;
  utterance.pitch = 1.0;
  utterance.volume = 1.0;

  const voice = ensureVoice();
  if (voice) utterance.voice = voice;

  window.speechSynthesis.speak(utterance);
}

/** Call once on app boot to trigger async voice loading early */
export function warmupSpeech() {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.getVoices();
}
