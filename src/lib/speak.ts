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

  const tryPlayAudio = (src: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const audio = new Audio(src);
      let resolved = false;
      const cleanup = () => {
        audio.onended = null;
        audio.onerror = null;
        audio.oncanplaythrough = null;
      };
      audio.oncanplaythrough = () => {
        audio
          .play()
          .then(() => {
            if (!resolved) {
              resolved = true;
              cleanup();
              resolve(true);
            }
          })
          .catch(() => {
            if (!resolved) {
              resolved = true;
              cleanup();
              resolve(false);
            }
          });
      };
      audio.onerror = () => {
        if (!resolved) {
          resolved = true;
          cleanup();
          resolve(false);
        }
      };
      // If the src 404s, onerror will fire
      audio.src = src;
      // Start loading
      audio.load();
      // Fallback timeout
      setTimeout(() => {
        if (!resolved) {
          resolved = true;
          cleanup();
          resolve(false);
        }
      }, 1500);
    });
  };

  const slugify = (s: string) =>
    s
      .toString()
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .replace(/[^\p{L}\p{N} ]+/gu, "")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "_");

  const candidates = [] as string[];
  const base = slugify(text);
  // try specific buckets
  candidates.push(`/audio/${base}.mp3`);
  candidates.push(`/audio/words/${base}.mp3`);
  candidates.push(`/audio/letters/${base}.mp3`);

  // For letter pairs like "A a" prefer single-letter file
  const first = String(text).trim().split(/\s+/)[0];
  const firstSlug = slugify(first);
  candidates.push(`/audio/letters/${firstSlug}.mp3`);

  // Try each candidate in order, play first that exists/plays
  (async () => {
    for (const c of candidates) {
      const ok = await tryPlayAudio(c);
      if (ok) return;
    }

    // Fallback to SpeechSynthesis if audio files not available
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "de-DE";
    u.rate = 0.82;
    u.pitch = 1.0;
    u.volume = 1.0;
    const voice = ensureVoice();
    if (voice) u.voice = voice;
    window.speechSynthesis.speak(u);
  })();
}

/** Call once on app boot to trigger async voice loading early */
export function warmupSpeech() {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.getVoices();
}
