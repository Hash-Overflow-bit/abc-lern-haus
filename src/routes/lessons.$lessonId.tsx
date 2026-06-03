import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import React, { useState, useEffect } from "react";
import lessons from "@/data/lessons.json";
import { speakDE, warmupSpeech } from "@/lib/speak";

export const Route = createFileRoute("/lessons/$lessonId")({
  head: ({ params }) => ({
    meta: [{ title: `Lektion ${params.lessonId} – Deutsch ABC` }],
  }),
  component: LessonPage,
});

const alphabetRows = [
  { id: "row1", label: "A bis G", letters: ["A", "B", "C", "D", "E", "F", "G"] },
  { id: "row2", label: "H bis P", letters: ["H", "I", "J", "K", "L", "M", "N", "O", "P"] },
  { id: "row3", label: "Q bis W", letters: ["Q", "R", "S", "T", "U", "V", "W"] },
  { id: "row4", label: "X bis Z", letters: ["X", "Y", "Z"] },
];

const sonderRow = ["\u00C4", "\u00D6", "\u00DC", "\u00DF", "ss"];

// Lesson 3: "Abc mit WIE" – full word list for each letter
const abcMitWieRows = [
  { letter: "A", word: "Apfel" },
  { letter: "B", word: "Buch" },
  { letter: "C", word: "Computer" },
  { letter: "D", word: "Deutsch" },
  { letter: "E", word: "England" },
  { letter: "F", word: "Fisch" },
  { letter: "G", word: "Gold" },
  { letter: "H", word: "Hotel" },
  { letter: "I", word: "Italien" },
  { letter: "J", word: "Japan" },
  { letter: "K", word: "Kanada" },
  { letter: "L", word: "London" },
  { letter: "M", word: "Mama" },
  { letter: "N", word: "November" },
  { letter: "O", word: "Orange" },
  { letter: "P", word: "Papa" },
  { letter: "Q", word: "Quiz" },
  { letter: "R", word: "Rot" },
  { letter: "S", word: "Schweiz" },
  { letter: "T", word: "Telefon" },
  { letter: "U", word: "Uhr" },
  { letter: "V", word: "Vater" },
  { letter: "W", word: "Wohnung" },
  { letter: "X", word: "Xylofon" },
  { letter: "Y", word: "Yoga" },
  { letter: "Z", word: "Zimmer" },
  { letter: "\u00C4", word: "\u00C4pfel" },
  { letter: "\u00D6", word: "\u00D6l" },
  { letter: "\u00DC", word: "\u00DCbersetzen" },
];

const palette = ["bg-white border-foreground/15 hover:bg-foreground/5 text-foreground"];

// Lesson 4: Vokale – vowel colour palette per vowel (Neutralized)
const vokalColors: Record<string, { bg: string; ring: string; badge: string; text: string }> = {
  A: {
    bg: "bg-white",
    ring: "ring-foreground/10 border-2 border-foreground/15",
    badge: "bg-foreground",
    text: "text-foreground",
  },
  E: {
    bg: "bg-white",
    ring: "ring-foreground/10 border-2 border-foreground/15",
    badge: "bg-foreground",
    text: "text-foreground",
  },
  I: {
    bg: "bg-white",
    ring: "ring-foreground/10 border-2 border-foreground/15",
    badge: "bg-foreground",
    text: "text-foreground",
  },
  O: {
    bg: "bg-white",
    ring: "ring-foreground/10 border-2 border-foreground/15",
    badge: "bg-foreground",
    text: "text-foreground",
  },
  U: {
    bg: "bg-white",
    ring: "ring-foreground/10 border-2 border-foreground/15",
    badge: "bg-foreground",
    text: "text-foreground",
  },
};

// Lesson 5: Lautkombinationen – colour palette per combination (Neutralized)
const lautkomColors: Record<
  string,
  { bg: string; ring: string; badge: string; text: string; highlight: string }
> = {
  Ch: {
    bg: "bg-white",
    ring: "ring-foreground/10 border-2 border-foreground/15",
    badge: "bg-foreground",
    text: "text-foreground",
    highlight: "text-foreground underline font-black",
  },
  Sch: {
    bg: "bg-white",
    ring: "ring-foreground/10 border-2 border-foreground/15",
    badge: "bg-foreground",
    text: "text-foreground",
    highlight: "text-foreground underline font-black",
  },
  Ei: {
    bg: "bg-white",
    ring: "ring-foreground/10 border-2 border-foreground/15",
    badge: "bg-foreground",
    text: "text-foreground",
    highlight: "text-foreground underline font-black",
  },
  Ie: {
    bg: "bg-white",
    ring: "ring-foreground/10 border-2 border-foreground/15",
    badge: "bg-foreground",
    text: "text-foreground",
    highlight: "text-foreground underline font-black",
  },
  Sp: {
    bg: "bg-white",
    ring: "ring-foreground/10 border-2 border-foreground/15",
    badge: "bg-foreground",
    text: "text-foreground",
    highlight: "text-foreground underline font-black",
  },
  St: {
    bg: "bg-white",
    ring: "ring-foreground/10 border-2 border-foreground/15",
    badge: "bg-foreground",
    text: "text-foreground",
    highlight: "text-foreground underline font-black",
  },
};

// Lesson 6: Ähnliche Lautpaare – colour palette per pair (Neutralized)
const lautpaarColors: Record<
  string,
  { bg: string; ring: string; badge: string; text: string; highlight: string }
> = {
  "E/I": {
    bg: "bg-white",
    ring: "ring-foreground/10 border-2 border-foreground/15",
    badge: "bg-foreground",
    text: "text-foreground",
    highlight: "text-foreground underline font-black",
  },
  "Ö/O": {
    bg: "bg-white",
    ring: "ring-foreground/10 border-2 border-foreground/15",
    badge: "bg-foreground",
    text: "text-foreground",
    highlight: "text-foreground underline font-black",
  },
  "Ü/U": {
    bg: "bg-white",
    ring: "ring-foreground/10 border-2 border-foreground/15",
    badge: "bg-foreground",
    text: "text-foreground",
    highlight: "text-foreground underline font-black",
  },
  "P/B": {
    bg: "bg-white",
    ring: "ring-foreground/10 border-2 border-foreground/15",
    badge: "bg-foreground",
    text: "text-foreground",
    highlight: "text-foreground underline font-black",
  },
  "T/D": {
    bg: "bg-white",
    ring: "ring-foreground/10 border-2 border-foreground/15",
    badge: "bg-foreground",
    text: "text-foreground",
    highlight: "text-foreground underline font-black",
  },
  "G/K": {
    bg: "bg-white",
    ring: "ring-foreground/10 border-2 border-foreground/15",
    badge: "bg-foreground",
    text: "text-foreground",
    highlight: "text-foreground underline font-black",
  },
};

// Lesson 8: Zahlen applications category info (Neutralized)
const catInfo: Record<
  string,
  { emoji: string; bg: string; ring: string; badge: string; text: string }
> = {
  "Zahlen 11-20": {
    emoji: "",
    bg: "bg-white",
    ring: "ring-foreground/10 border-2 border-foreground/15",
    badge: "bg-foreground",
    text: "text-foreground",
  },
  Telefonnummer: {
    emoji: "",
    bg: "bg-white",
    ring: "ring-foreground/10 border-2 border-foreground/15",
    badge: "bg-foreground",
    text: "text-foreground",
  },
  Preise: {
    emoji: "",
    bg: "bg-white",
    ring: "ring-foreground/10 border-2 border-foreground/15",
    badge: "bg-foreground",
    text: "text-foreground",
  },
  Datum: {
    emoji: "",
    bg: "bg-white",
    ring: "ring-foreground/10 border-2 border-foreground/15",
    badge: "bg-foreground",
    text: "text-foreground",
  },
  Reihenfolge: {
    emoji: "",
    bg: "bg-white",
    ring: "ring-foreground/10 border-2 border-foreground/15",
    badge: "bg-foreground",
    text: "text-foreground",
  },
};

// Lesson 9: Zeit applications category info (Neutralized)
const zeitCatColors: Record<
  string,
  { emoji: string; bg: string; ring: string; badge: string; text: string }
> = {
  "1. 12-Stunden-Uhr + 24-Stunden-Uhr": {
    emoji: "",
    bg: "bg-white",
    ring: "ring-foreground/10 border-2 border-foreground/15",
    badge: "bg-foreground",
    text: "text-foreground",
  },
  "2. Digitale Uhrzeit": {
    emoji: "",
    bg: "bg-white",
    ring: "ring-foreground/10 border-2 border-foreground/15",
    badge: "bg-foreground",
    text: "text-foreground",
  },
  "3. Wie spät ist es?": {
    emoji: "",
    bg: "bg-white",
    ring: "ring-foreground/10 border-2 border-foreground/15",
    badge: "bg-foreground",
    text: "text-foreground",
  },
  "4. heute / morgen": {
    emoji: "",
    bg: "bg-white",
    ring: "ring-foreground/10 border-2 border-foreground/15",
    badge: "bg-foreground",
    text: "text-foreground",
  },
  "5. volle Uhr": {
    emoji: "",
    bg: "bg-white",
    ring: "ring-foreground/10 border-2 border-foreground/15",
    badge: "bg-foreground",
    text: "text-foreground",
  },
};

function LessonPage() {
  const { lessonId } = Route.useParams();

  const [mode, setMode] = useState<"learn" | "exercise">("learn");
  const [picked, setPicked] = useState<string | null>(null);
  const [pickedRevision, setPickedRevision] = useState<string | null>(null);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [exercisePhase, setExercisePhase] = useState<"revision" | "current">("revision");

  // Reset page state when changing lessons
  useEffect(() => {
    setMode("learn");
    setPicked(null);
    setPickedRevision(null);
    setUserAnswers({});
    setExercisePhase("revision");
  }, [lessonId]);

  // Warm up SpeechSynthesis once on first user interaction so browsers allow playback
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handler = () => {
      try {
        warmupSpeech();
      } catch (e) {
        // ignore
      }
      window.removeEventListener("pointerdown", handler);
    };
    window.addEventListener("pointerdown", handler, { passive: true });
    return () => window.removeEventListener("pointerdown", handler);
  }, []);

  function speakLessonItem(text: string) {
    speakDE(text);
  }

  // Get previous lesson for revision
  const currentLessonIndex = lessons.findIndex((l) => l.id === lessonId);
  const previousLesson = currentLessonIndex > 0 ? lessons[currentLessonIndex - 1] : null;

  const lesson = lessons.find((l) => l.id === lessonId);
  if (!lesson) throw notFound();

  const ex = lesson.exercise;
  const revisionEx = previousLesson?.exercise;
  const isCorrect = picked === ex.answer;
  const isRevisionCorrect = pickedRevision === revisionEx?.answer;

  function chooseRevision(opt: string) {
    setPickedRevision(opt);
    if (opt === revisionEx?.answer) {
      speakDE("Super!");
      // After 1 second, move to current exercise
      setTimeout(() => setExercisePhase("current"), 1500);
    } else {
      speakDE("Nochmal!");
    }
  }

  function choose(opt: string) {
    setPicked(opt);
    if (opt === ex.answer) {
      speakDE("Super!");
    } else {
      speakDE("Nochmal!");
    }
  }

  // Answer validation for Lesson 1 & 2
  function checkAnswer(letter: string, val: string) {
    if (!val) return false;
    const cleanVal = val.replace(/\s+/g, "").trim();
    const cleanValLower = cleanVal.toLowerCase();
    const letterLower = letter.toLowerCase();


    if (lessonId === "2") {
      // Lesson 2: require BOTH capital and small letter (e.g. "A a", "Aa")
      // Special cases: ß stays as ß, ss stays as ss
      if (letter === "\u00DF" || letter === "ss") {
        return cleanValLower === letter.toLowerCase();
      }
      // For umlauts: Ä→Ää, Ö→Öö, Ü→Üü
      if (letter === "\u00C4")
        return cleanVal === "\u00C4\u00E4" || cleanValLower === "\u00E4\u00E4";
      if (letter === "\u00D6")
        return cleanVal === "\u00D6\u00F6" || cleanValLower === "\u00F6\u00F6";
      if (letter === "\u00DC")
        return cleanVal === "\u00DC\u00FC" || cleanValLower === "\u00FC\u00FC";
      // Regular letters: must have uppercase + lowercase (e.g. "Aa")
      const expected = letter + letter.toLowerCase();
      return cleanVal === expected;
    }

    // Lesson 1: accept letter or double letter
    return cleanValLower === letterLower || cleanValLower === letterLower + letterLower;
  }

  function handleInputChange(letter: string, val: string) {
    const wasCorrect = checkAnswer(letter, userAnswers[letter] || "");
    const isCorrectNow = checkAnswer(letter, val);

    setUserAnswers((prev) => ({ ...prev, [letter]: val }));

    if (isCorrectNow && !wasCorrect) {
      speakDE("Super!");
    }
  }

  const allLetters = [...alphabetRows.flatMap((r) => r.letters), ...sonderRow];
  const isABCComplete = allLetters.every((l) => checkAnswer(l, userAnswers[l] || ""));

  // Lesson 3: check fill-blank answer
  function checkWieAnswer(word: string, val: string) {
    if (!val) return false;
    return val.trim().toLowerCase() === word.toLowerCase();
  }

  function handleWieInput(letter: string, val: string) {
    const row = abcMitWieRows.find((r) => r.letter === letter);
    const wasCorrect = row ? checkWieAnswer(row.word, userAnswers[`wie_${letter}`] || "") : false;
    const isNowCorrect = row ? checkWieAnswer(row.word, val) : false;
    setUserAnswers((prev) => ({ ...prev, [`wie_${letter}`]: val }));
    if (isNowCorrect && !wasCorrect) speakDE("Super!");
  }

  const isWieComplete = abcMitWieRows.every((r) =>
    checkWieAnswer(r.word, userAnswers[`wie_${r.letter}`] || ""),
  );

  // Lesson 4: Vokale helpers
  const vokalGroups = (lesson as any).vokale as { vowel: string; words: string[] }[] | undefined;

  function checkVokalAnswer(word: string, val: string) {
    if (!val) return false;
    return val.trim().toLowerCase() === word.toLowerCase();
  }

  function handleVokalInput(word: string, val: string) {
    const wasCorrect = checkVokalAnswer(word, userAnswers[`v_${word}`] || "");
    const isNowCorrect = checkVokalAnswer(word, val);
    setUserAnswers((prev) => ({ ...prev, [`v_${word}`]: val }));
    if (isNowCorrect && !wasCorrect) speakDE("Super!");
  }

  const isVokaleComplete = vokalGroups
    ? vokalGroups.every((g) =>
        g.words.every((w) => checkVokalAnswer(w, userAnswers[`v_${w}`] || "")),
      )
    : false;

  // Lesson 5: Lautkombinationen helpers
  const lautkomGroups = (lesson as any).lautkom as
    | { combo: string; label: string; words: string[] }[]
    | undefined;

  function checkLautAnswer(word: string, val: string) {
    if (!val) return false;
    return val.trim().toLowerCase() === word.toLowerCase();
  }

  function handleLautInput(word: string, val: string) {
    const wasCorrect = checkLautAnswer(word, userAnswers[`l_${word}`] || "");
    const isNowCorrect = checkLautAnswer(word, val);
    setUserAnswers((prev) => ({ ...prev, [`l_${word}`]: val }));
    if (isNowCorrect && !wasCorrect) speakDE("Super!");
  }

  const isLautComplete = lautkomGroups
    ? lautkomGroups.every((g) =>
        g.words.every((w) => checkLautAnswer(w, userAnswers[`l_${w}`] || "")),
      )
    : false;

  // Lesson 6: Ähnliche Lautpaare helpers
  const lautpaarGroups = (lesson as any).lautpaare as
    | { pair: string; label: string; words1: string[]; words2: string[] }[]
    | undefined;

  function checkLautpaarAnswer(word: string, val: string) {
    if (!val) return false;
    return val.trim().toLowerCase() === word.toLowerCase();
  }

  function handleLautpaarInput(pair: string, word: string, idx: number, val: string) {
    const key = `p_${pair}_${word}_${idx}`;
    const wasCorrect = checkLautpaarAnswer(word, userAnswers[key] || "");
    const isNowCorrect = checkLautpaarAnswer(word, val);
    setUserAnswers((prev) => ({ ...prev, [key]: val }));
    if (isNowCorrect && !wasCorrect) speakDE("Super!");
  }

  const isLautpaarComplete = lautpaarGroups
    ? lautpaarGroups.every((g) => {
        const allWords: string[] = [];
        const maxLen = Math.max(g.words1.length, g.words2.length);
        for (let i = 0; i < maxLen; i++) {
          if (i < g.words1.length) allWords.push(g.words1[i]);
          if (i < g.words2.length) allWords.push(g.words2[i]);
        }
        return allWords.every((w, idx) =>
          checkLautpaarAnswer(w, userAnswers[`p_${g.pair}_${w}_${idx}`] || ""),
        );
      })
    : false;

  // Highlight the target pair letters inside a word (case-insensitive)
  function highlightPair(word: string, label: string): React.ReactNode {
    const chars = label.split("/").map((c) => c.trim().toLowerCase());
    const lower = word.toLowerCase();

    // Find index of the first matching character
    let bestIdx = -1;
    let matchLen = 1;
    for (const char of chars) {
      const idx = lower.indexOf(char);
      if (idx !== -1 && (bestIdx === -1 || idx < bestIdx)) {
        bestIdx = idx;
        matchLen = char.length;
      }
    }

    if (bestIdx === -1) return <span>{word}</span>;

    return (
      <span>
        {word.slice(0, bestIdx)}
        <span className="underline decoration-2 font-black" style={{ color: "inherit" }}>
          {word.slice(bestIdx, bestIdx + matchLen)}
        </span>
        {word.slice(bestIdx + matchLen)}
      </span>
    );
  }

  // Lesson 7: Zahlen 0–10 helpers
  const numberGroups = (lesson as any).numbers as { n: number; word: string }[] | undefined;

  function checkNumberAnswer(word: string, val: string) {
    if (!val) return false;
    return val.trim().toLowerCase() === word.toLowerCase();
  }

  function handleNumberInput(word: string, val: string) {
    const wasCorrect = checkNumberAnswer(word, userAnswers[`num_${word}`] || "");
    const isNowCorrect = checkNumberAnswer(word, val);
    setUserAnswers((prev) => ({ ...prev, [`num_${word}`]: val }));
    if (isNowCorrect && !wasCorrect) speakDE("Super!");
  }

  const isNumbersComplete = numberGroups
    ? numberGroups.every((g) => checkNumberAnswer(g.word, userAnswers[`num_${g.word}`] || ""))
    : false;

  // Lesson 8: Zahlen 11–20 & Anwendungen helpers
  const numberAnwGroups = (lesson as any).numbers_anw as
    | { label: string; word: string; category: string }[]
    | undefined;

  function checkNumberAnwAnswer(word: string, val: string) {
    if (!val) return false;
    return val.trim().toLowerCase() === word.toLowerCase();
  }

  function handleNumberAnwInput(word: string, idx: number, val: string) {
    const key = `numanw_${word}_${idx}`;
    const wasCorrect = checkNumberAnwAnswer(word, userAnswers[key] || "");
    const isNowCorrect = checkNumberAnwAnswer(word, val);
    setUserAnswers((prev) => ({ ...prev, [key]: val }));
    if (isNowCorrect && !wasCorrect) speakDE("Super!");
  }

  const isNumbersAnwComplete = numberAnwGroups
    ? numberAnwGroups.every((g, idx) =>
        checkNumberAnwAnswer(g.word, userAnswers[`numanw_${g.word}_${idx}`] || ""),
      )
    : false;

  // Lesson 9: Zeit helpers
  const zeitGroups = (lesson as any).zeit as
    | { category: string; items: { label: string; word: string }[] }[]
    | undefined;
  const zeitExercises = (lesson as any).exercises as { label: string; word: string }[] | undefined;

  function checkZeitAnswer(word: string, val: string) {
    if (!val) return false;
    return (
      val.trim().toLowerCase().replace(/\s+/g, " ") === word.toLowerCase().replace(/\s+/g, " ")
    );
  }

  function handleZeitInput(word: string, idx: number, val: string) {
    const key = `zeit_${word}_${idx}`;
    const wasCorrect = checkZeitAnswer(word, userAnswers[key] || "");
    const isNowCorrect = checkZeitAnswer(word, val);
    setUserAnswers((prev) => ({ ...prev, [key]: val }));
    if (isNowCorrect && !wasCorrect) speakDE("Super!");
  }

  const isZeitComplete = zeitExercises
    ? zeitExercises.every((g, idx) =>
        checkZeitAnswer(g.word, userAnswers[`zeit_${g.word}_${idx}`] || ""),
      )
    : false;

  // Lesson 10: Wiederholung helpers
  const reviewGroups = (lesson as any).wiederholung as
    | { category: string; items: { prompt: string; answer: string; full: string }[] }[]
    | undefined;

  // Highlight the combo letters inside a word
  function checkReviewAnswer(answer: string, val: string) {
    if (!answer) return true; // No answer needed (display only)
    if (!val) return false;
    return val.trim().toLowerCase() === answer.toLowerCase();
  }

  function handleReviewInput(answer: string, catIdx: number, itemIdx: number, val: string) {
    const key = `rev_${catIdx}_${itemIdx}`;
    const wasCorrect = checkReviewAnswer(answer, userAnswers[key] || "");
    const isNowCorrect = checkReviewAnswer(answer, val);
    setUserAnswers((prev) => ({ ...prev, [key]: val }));
    if (isNowCorrect && !wasCorrect) speakDE("Super!");
  }

  const isReviewComplete = reviewGroups
    ? reviewGroups.every((g, catIdx) =>
        g.items.every((it, itemIdx) =>
          checkReviewAnswer(it.answer, userAnswers[`rev_${catIdx}_${itemIdx}`] || ""),
        ),
      )
    : false;

  // Highlight the combo letters inside a word
  function highlightCombo(word: string, combo: string): React.ReactNode {
    const lower = word.toLowerCase();
    const comboLower = combo.toLowerCase();
    const idx = lower.indexOf(comboLower);
    if (idx === -1) return <span>{word}</span>;
    return (
      <span>
        {word.slice(0, idx)}
        <span className="underline decoration-2 font-black" style={{ color: "inherit" }}>
          {word.slice(idx, idx + combo.length)}
        </span>
        {word.slice(idx + combo.length)}
      </span>
    );
  }

  function getLetterDisplay(l: string) {
    if (lessonId === "2") {
      if (l === "\u00DF" || l === "ss") return l;
      if (l === "\u00C4") return "\u00C4 \u00E4";
      if (l === "\u00D6") return "\u00D6 \u00F6";
      if (l === "\u00DC") return "\u00DC \u00FC";
      return `${l} ${l.toLowerCase()}`;
    }
    return l;
  }

  return (
    <>
      <div className="mx-auto max-w-2xl space-y-6 pb-10">
        {/* Navigation back and Step Indicator */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            to="/lessons"
            className="self-start inline-flex items-center gap-1 rounded-full bg-white/80 px-4 py-1.5 text-sm font-black text-foreground/70 shadow hover:bg-white transition active:scale-95"
          >
            ← Alle Lektionen
          </Link>

          <div className="flex items-center gap-3 text-xs sm:text-sm font-black select-none">
            <button
              onClick={() => setMode("learn")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${
                mode === "learn"
                  ? "bg-amber-300 text-foreground shadow-md scale-105 ring-2 ring-white"
                  : "bg-white/40 text-foreground/50 hover:bg-white/60"
              }`}
            >
              <span>1. Lernen</span>
            </button>
            <div className="h-1 w-4 sm:w-6 rounded bg-foreground/20"></div>
            <button
              onClick={() => setMode("exercise")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full transition-all ${
                mode === "exercise"
                  ? "bg-primary text-primary-foreground shadow-md scale-105 ring-2 ring-white"
                  : "bg-white/40 text-foreground/50 hover:bg-white/60"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
              </svg>
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* LESSON 1 & 2 CUSTOM ALPHABET GRID LAYOUT                 */}
        {/* ======================================================== */}
        {lessonId === "3" ? (
          <>
            {/* ======================================================== */}
            {/* LESSON 3: ABC MIT WIE – LEARN + EXERCISE                 */}
            {/* ======================================================== */}

            {/* LERNEN MODE */}
            {mode === "learn" && (
              <section className="rounded-3xl bg-white/80 p-5 sm:p-8 shadow-lg ring-4 ring-white animate-fade-in space-y-6">
                <div className="flex items-center gap-3">
                  <div>
                    <h2 className="text-2xl font-black text-foreground">Abc mit WIE</h2>
                    
                  </div>
                </div>

                {/* Main ABC mit WIE chart image */}
                <div className="rounded-2xl overflow-hidden border-2 border-foreground/15 shadow-md">
                  <img
                    src="/abc_mit_wie_chart.png"
                    alt="ABC mit WIE – Übersicht aller Buchstaben mit deutschen Wörtern"
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Umlaute special letters image */}
                <div className="space-y-2">
                  <div className="text-[10px] font-black text-foreground/60 uppercase tracking-wider px-1 flex items-center gap-1">
                    <span>Sonderbuchstaben mit WIE</span>
                  </div>
                  <div className="rounded-2xl overflow-hidden border-2 border-foreground/15 shadow-md bg-white">
                    <img
                      src="/umlaute_wie_cards.png"
                      alt="Ä wie Äpfel, Ö wie Öl, Ü wie Übersetzen"
                      className="w-full h-auto object-contain"
                    />
                  </div>
                </div>

                {/* Word cards */}
                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-foreground/60 uppercase tracking-wider">
                    Wörter:
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {abcMitWieRows.map((row) => (
                      <div
                        key={row.letter}
                        role="button"
                        tabIndex={0}
                        onClick={() => speakDE(`${row.letter} wie ${row.word}`)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ")
                            speakDE(`${row.letter} wie ${row.word}`);
                        }}
                        className={`${palette[0]} flex items-center gap-2 rounded-2xl border-2 px-3 py-2 shadow-sm text-left cursor-pointer`}
                      >
                        <span className="text-xl font-black w-8 shrink-0">{row.letter}</span>
                        <span className="text-xs font-bold opacity-60">wie</span>
                        <span className="text-sm font-black">{row.word}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end mt-6 sm:mt-8">
                  <button
                    onClick={() => setMode("exercise")}
                    title="Übung machen"
                    className="p-4 sm:p-5 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl ring-4 ring-white transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer group"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-7 w-7 sm:h-8 sm:w-8 group-hover:animate-bounce"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                    </svg>
                  </button>
                </div>
              </section>
            )}

            {/* ÜBUNG MODE – fill-in-the-blank table */}
            {mode === "exercise" && (
              <section className="rounded-3xl bg-white/80 p-5 sm:p-8 shadow-lg ring-4 ring-white animate-fade-in space-y-6">
                <div className="flex items-center gap-3 justify-between">
                  <div className="flex items-center gap-3">
                    <div>
                      <h2 className="text-2xl font-black text-foreground">Schreibübung</h2>
                      
                    </div>
                  </div>
                  <button
                    onClick={() => setMode("learn")}
                    className="text-xs font-black text-primary hover:underline"
                  >
                    Wörter lernen
                  </button>
                </div>

                {/* Fill-in-the-blank table */}
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-foreground/5">
                        <th className="text-left px-4 py-3 text-sm font-black text-foreground/70 rounded-tl-2xl w-16">
                          Abc
                        </th>
                        <th className="text-left px-4 py-3 text-sm font-black text-foreground/70 w-16">
                          wie
                        </th>
                        <th className="text-left px-4 py-3 text-sm font-black text-foreground/70 rounded-tr-2xl">
                          Deutsch
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {abcMitWieRows.map((row, idx) => {
                        const key = `wie_${row.letter}`;
                        const val = userAnswers[key] || "";
                        const correct = checkWieAnswer(row.word, val);
                        const hasVal = val.length > 0;
                        return (
                          <tr
                            key={row.letter}
                            className={`border-b border-foreground/5 transition-colors ${
                              correct
                                ? "bg-emerald-50"
                                : idx % 2 === 0
                                  ? "bg-white/60"
                                  : "bg-white/30"
                            }`}
                          >
                            <td className="px-4 py-2">
                              <span className="text-2xl font-black text-foreground select-none">
                                {row.letter}
                              </span>
                            </td>
                            <td className="px-4 py-2">
                              <span className="text-sm font-bold text-foreground/40">wie</span>
                            </td>
                            <td className="px-4 py-2">
                              {correct ? (
                                <span className="inline-flex items-center gap-2 text-base font-black text-emerald-700">
                                  {row.word} ✅
                                </span>
                              ) : (
                                <input
                                  type="text"
                                  value={val}
                                  onChange={(e) => handleWieInput(row.letter, e.target.value)}
                                  placeholder="?"
                                  maxLength={20}
                                  className={`w-full max-w-[200px] px-3 py-1.5 rounded-xl border-2 text-sm font-black transition-all outline-none ${
                                    hasVal
                                      ? "bg-rose-100 border-rose-400 text-rose-800 animate-shake"
                                      : "bg-white border-dashed border-sky-300 focus:border-sky-50/50"
                                  }`}
                                />
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Completion celebration */}
                {isWieComplete && (
                  <div className="mt-8 text-center animate-bounce bg-emerald-50 border border-emerald-100 rounded-3xl p-5 shadow-inner">
                    <div className="text-6xl">🎉😊🎉</div>
                    <p className="mt-3 text-xl font-black text-emerald-700">
                      Großartig! Du hast alle Wörter geschrieben!
                    </p>
                    <NextLessonButton currentId={lesson.id} />
                  </div>
                )}
              </section>
            )}
          </>
        ) : lessonId === "4" && vokalGroups ? (
          <>
            {/* ======================================================== */}
            {/* LESSON 4: VOKALE – LEARN + EXERCISE                       */}
            {/* ======================================================== */}

            {/* LERNEN MODE */}
            {mode === "learn" && (
              <section className="rounded-3xl bg-white/80 p-5 sm:p-8 shadow-lg ring-4 ring-white animate-fade-in space-y-6">
                {/* Header */}
                <div className="flex items-center gap-3">
                  <div>
                    <h2 className="text-2xl font-black text-foreground">Vokale</h2>
                    
                  </div>
                </div>

                {/* Vowel bubbles strip */}
                <div className="flex gap-3 justify-center flex-wrap">
                  {vokalGroups.map((g) => (
                    <div
                      key={g.vowel}
                      className="bg-foreground/10 text-foreground w-14 h-14 rounded-full text-3xl font-black shadow-lg flex items-center justify-center select-none"
                    >
                      {g.vowel}
                    </div>
                  ))}
                </div>

                {/* Word groups per vowel */}
                <div className="space-y-5">
                  {vokalGroups.map((g) => {
                    return (
                      <div
                        key={g.vowel}
                        className="bg-white/50 rounded-2xl p-4 border border-foreground/10 space-y-3"
                      >
                        {/* Vowel badge + header */}
                        <div className="flex items-center gap-3">
                          <span className="bg-foreground/10 text-foreground w-10 h-10 rounded-xl text-xl font-black flex items-center justify-center shadow select-none">
                            {g.vowel}
                          </span>
                          <div>
                            <div className="text-lg font-black text-foreground">
                              {g.vowel} – Deutsch
                            </div>
                          </div>
                        </div>
                        {/* Word grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {g.words.map((w) => (
                            <div
                              key={w}
                              role="button"
                              tabIndex={0}
                              onClick={() => speakDE(w)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") speakDE(w);
                              }}
                              className="bg-white rounded-xl px-3 py-2 text-sm font-black text-foreground shadow-sm border border-foreground/10 text-left cursor-pointer"
                            >
                              <span>{w}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <button
                  onClick={() => setMode("exercise")}
                  className="w-full mt-6 py-5 px-6 rounded-3xl bg-foreground text-white font-black text-xl sm:text-2xl shadow-xl hover:shadow-2xl ring-4 ring-white transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 select-none cursor-pointer group"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                  </svg>
                </button>
              </section>
            )}

            {/* ÜBUNG MODE – 2-column fill-in-the-blank */}
            {mode === "exercise" && (
              <section className="rounded-3xl bg-white/80 p-5 sm:p-8 shadow-lg ring-4 ring-white animate-fade-in space-y-6">
                <div className="flex items-center gap-3 justify-between">
                  <div className="flex items-center gap-3">
                    <div>
                      <h2 className="text-2xl font-black text-foreground">Schreibübung</h2>
                      
                    </div>
                  </div>
                  <button
                    onClick={() => setMode("learn")}
                    className="text-xs font-black text-primary hover:underline"
                  >
                    Vokale lernen
                  </button>
                </div>

                {/* 2-column table grouped by vowel */}
                <div className="space-y-6">
                  {vokalGroups.map((g) => {
                    return (
                      <div
                        key={g.vowel}
                        className="overflow-hidden rounded-2xl border border-foreground/10 shadow-sm"
                      >
                        {/* Vowel section header */}
                        <div className="bg-foreground/5 px-4 py-2 flex items-center gap-3">
                          <span className="text-foreground text-2xl font-black">{g.vowel}</span>
                          <span className="text-foreground/60 text-sm font-bold">
                            Vokale – {g.vowel}
                          </span>
                        </div>
                        {/* Column headers */}
                        <div className="grid grid-cols-2 bg-foreground/5">
                          <div className="px-4 py-2 text-xs font-black text-foreground/60 uppercase tracking-wider border-r border-foreground/10">
                            Deutsch
                          </div>
                          <div className="px-4 py-2 text-xs font-black text-foreground/60 uppercase tracking-wider">
                            Schreibe hier
                          </div>
                        </div>
                        {/* Rows */}
                        {g.words.map((w, idx) => {
                          const val = userAnswers[`v_${w}`] || "";
                          const correct = checkVokalAnswer(w, val);
                          const hasVal = val.length > 0;
                          return (
                            <div
                              key={w}
                              className={`grid grid-cols-2 border-t border-foreground/5 transition-colors ${
                                correct
                                  ? "bg-emerald-50"
                                  : idx % 2 === 0
                                    ? "bg-white"
                                    : "bg-white/50"
                              }`}
                            >
                              {/* Column 1: German word */}
                              <div className="px-4 py-2.5 border-r border-foreground/10 flex items-center">
                                <span className="text-sm font-black text-foreground select-none">
                                  {w}
                                </span>
                              </div>
                              {/* Column 2: Blank input */}
                              <div className="px-4 py-2 flex items-center">
                                {correct ? (
                                  <span className="text-sm font-black text-emerald-700 flex items-center gap-1">
                                    {w}
                                  </span>
                                ) : (
                                  <input
                                    type="text"
                                    value={val}
                                    onChange={(e) => handleVokalInput(w, e.target.value)}
                                    placeholder="?"
                                    maxLength={25}
                                    className={`w-full px-3 py-1.5 rounded-xl border-2 text-sm font-black transition-all outline-none ${
                                      hasVal
                                        ? "bg-rose-100 border-rose-400 text-rose-800 animate-shake"
                                        : "bg-white border-dashed border-sky-300 focus:border-sky-50/50"
                                    }`}
                                  />
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>

                {/* Completion */}
                {isVokaleComplete && (
                  <div className="mt-8 text-center bg-emerald-50 border border-emerald-100 rounded-3xl p-5 shadow-inner">
                    <p className="mt-3 text-xl font-black text-emerald-700">
                      Großartig! Du hast alle Vokale geschrieben!
                    </p>
                    <NextLessonButton currentId={lesson.id} />
                  </div>
                )}
              </section>
            )}
          </>
        ) : lessonId === "6" && lautpaarGroups ? (
          <>
            {/* ======================================================== */}
            {/* LESSON 6: ÄHNLICHE LAUTPAARE – LEARN + EXERCISE           */}
            {/* ======================================================== */}

            {/* LERNEN MODE */}
            {mode === "learn" && (
              <section className="rounded-3xl bg-white/80 p-5 sm:p-8 shadow-lg ring-4 ring-white animate-fade-in space-y-6">
                <div className="flex items-center gap-3">
                  <div>
                    <h2 className="text-2xl font-black text-foreground">Ähnliche Lautpaare</h2>
                    
                  </div>
                </div>

                <div className="flex gap-2 flex-wrap justify-center">
                  {lautpaarGroups.map((g) => (
                    <div
                      key={g.pair}
                      className="bg-foreground text-white px-5 py-2 rounded-full text-lg font-black shadow-md select-none"
                    >
                      {g.label}
                    </div>
                  ))}
                </div>

                <div className="space-y-6">
                  {lautpaarGroups.map((g) => {
                    const c = lautpaarColors[g.pair] || {
                      bg: "bg-white",
                      ring: "ring-foreground/10 border-2 border-foreground/15",
                      badge: "bg-foreground",
                      text: "text-foreground",
                    };
                    return (
                      <div
                        key={g.pair}
                        className={`${c.bg} rounded-2xl p-4 sm:p-5 border border-foreground/10 space-y-4`}
                      >
                        <div className="flex items-center gap-3 border-b border-foreground/5 pb-2">
                          <span className="bg-foreground text-white px-3 py-1 rounded-lg text-lg font-black shadow select-none">
                            {g.label}
                          </span>
                          <span className="text-base font-black text-foreground">
                            Vergleiche Deutsch 1 und Deutsch 2
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-3 sm:gap-4">
                          <div className="space-y-2">
                            <div className="text-xs font-black opacity-60 tracking-wider uppercase pl-2">
                              Deutsch 1
                            </div>
                            {g.words1.map((w) => (
                              <div
                                key={w}
                                role="button"
                                tabIndex={0}
                                onClick={() => speakDE(w)}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter" || e.key === " ") speakDE(w);
                                }}
                                className="w-full bg-white rounded-xl px-3 py-2 text-sm font-bold text-foreground shadow-sm border border-foreground/10 text-left cursor-pointer"
                              >
                                <span>{highlightPair(w, g.label)}</span>
                              </div>
                            ))}
                          </div>

                          <div className="space-y-2">
                            <div className="text-xs font-black opacity-60 tracking-wider uppercase pl-2">
                              Deutsch 2
                            </div>
                            {g.words2.map((w) => (
                              <div
                                key={w}
                                role="button"
                                tabIndex={0}
                                onClick={() => speakDE(w)}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter" || e.key === " ") speakDE(w);
                                }}
                                className="w-full bg-white rounded-xl px-3 py-2 text-sm font-bold text-foreground shadow-sm border border-foreground/10 text-left cursor-pointer"
                              >
                                <span>{highlightPair(w, g.label)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-end mt-6 sm:mt-8">
                  <button
                    onClick={() => setMode("exercise")}
                    title="Übung machen"
                    className="p-4 sm:p-5 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl ring-4 ring-white transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer group"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-7 w-7 sm:h-8 sm:w-8 group-hover:animate-bounce"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                    </svg>
                  </button>
                </div>
              </section>
            )}

            {/* ÜBUNG MODE */}
            {mode === "exercise" && (
              <section className="rounded-3xl bg-white/80 p-5 sm:p-8 shadow-lg ring-4 ring-white animate-fade-in space-y-6">
                <div className="flex items-center gap-3 justify-between">
                  <div className="flex items-center gap-3">
                    <div>
                      <h2 className="text-2xl font-black text-foreground">Schreibübung</h2>
                      
                    </div>
                  </div>
                  <button
                    onClick={() => setMode("learn")}
                    className="text-xs font-black text-primary hover:underline"
                  >
                    Lautpaare lernen
                  </button>
                </div>

                <div className="space-y-6">
                  {lautpaarGroups.map((g) => {
                    const c = lautpaarColors[g.pair] || {
                      bg: "bg-white",
                      ring: "ring-foreground/10 border-2 border-foreground/15",
                      badge: "bg-foreground",
                      text: "text-foreground",
                    };

                    // Interleave words1 and words2
                    const allWords: string[] = [];
                    const maxLen = Math.max(g.words1.length, g.words2.length);
                    for (let i = 0; i < maxLen; i++) {
                      if (i < g.words1.length) allWords.push(g.words1[i]);
                      if (i < g.words2.length) allWords.push(g.words2[i]);
                    }

                    return (
                      <div
                        key={g.pair}
                        className="overflow-hidden rounded-2xl border border-foreground/10 shadow-sm"
                      >
                        {/* Section header */}
                        <div className="bg-foreground/5 px-4 py-2.5 flex items-center gap-3">
                          <span className="text-foreground text-xl font-black tracking-widest">
                            {g.label}
                          </span>
                          <span className="text-foreground/60 text-sm font-bold">
                            Ähnliche Lautpaare – {g.label}
                          </span>
                        </div>
                        {/* Column labels */}
                        <div className="grid grid-cols-2 bg-foreground/5">
                          <div className="px-4 py-2 text-xs font-black text-foreground/60 uppercase tracking-wider border-r border-foreground/10">
                            Deutsch
                          </div>
                          <div className="px-4 py-2 text-xs font-black text-foreground/60 uppercase tracking-wider">
                            Schreibe hier
                          </div>
                        </div>
                        {/* Rows */}
                        {allWords.map((w, idx) => {
                          const key = `p_${g.pair}_${w}_${idx}`;
                          const val = userAnswers[key] || "";
                          const correct = checkLautpaarAnswer(w, val);
                          const hasVal = val.length > 0;
                          return (
                            <div
                              key={`${w}-${idx}`}
                              className={`grid grid-cols-2 border-t border-foreground/5 transition-colors ${
                                correct
                                  ? "bg-emerald-50"
                                  : idx % 2 === 0
                                    ? "bg-white"
                                    : "bg-white/50"
                              }`}
                            >
                              {/* Col 1: word with highlighted combo */}
                              <div className="px-4 py-2.5 border-r border-foreground/10 flex items-center">
                                <span className="text-sm font-black text-foreground select-none">
                                  {highlightPair(w, g.label)}
                                </span>
                              </div>
                              {/* Col 2: blank input */}
                              <div className="px-4 py-2 flex items-center">
                                {correct ? (
                                  <span className="text-sm font-black text-emerald-700 flex items-center gap-1">
                                    {w} ✅
                                  </span>
                                ) : (
                                  <input
                                    type="text"
                                    value={val}
                                    onChange={(e) =>
                                      handleLautpaarInput(g.pair, w, idx, e.target.value)
                                    }
                                    placeholder="?"
                                    maxLength={30}
                                    className={`w-full px-3 py-1.5 rounded-xl border-2 text-sm font-black transition-all outline-none ${
                                      hasVal
                                        ? "bg-rose-100 border-rose-400 text-rose-800 animate-shake"
                                        : "bg-white border-dashed border-sky-300 focus:border-sky-50/50"
                                    }`}
                                  />
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>

                {/* Completion */}
                {isLautpaarComplete && (
                  <div className="mt-8 text-center animate-bounce bg-emerald-50 border border-emerald-100 rounded-3xl p-5 shadow-inner">
                    <p className="mt-3 text-xl font-black text-emerald-700">
                      Großartig! Du hast alle Wörter geschrieben!
                    </p>
                    <NextLessonButton currentId={lesson.id} />
                  </div>
                )}
              </section>
            )}
          </>
        ) : lessonId === "7" && numberGroups ? (
          <>
            {/* ======================================================== */}
            {/* LESSON 7: ZAHLEN 0-10 – LEARN + EXERCISE                 */}
            {/* ======================================================== */}

            {/* LERNEN MODE */}
            {mode === "learn" && (
              <section className="rounded-3xl bg-white/80 p-5 sm:p-8 shadow-lg ring-4 ring-white animate-fade-in space-y-6">
                <div className="flex items-center gap-3">
                  <div>
                    <h2 className="text-2xl font-black text-foreground">Zahlen 0–10</h2>
                    
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {numberGroups.map((num, idx) => (
                    <div
                      key={num.n}
                      role="button"
                      tabIndex={0}
                      onClick={() => speakDE(num.word)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") speakDE(num.word);
                      }}
                      className="flex flex-col items-center justify-center p-5 rounded-3xl border-2 border-foreground/10 bg-white shadow-sm cursor-pointer"
                    >
                      <span className="text-5xl font-black select-none">{num.n}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end mt-6 sm:mt-8">
                  <button
                    onClick={() => setMode("exercise")}
                    title="Übung machen"
                    className="p-4 sm:p-5 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl ring-4 ring-white transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer group"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-7 w-7 sm:h-8 sm:w-8 group-hover:animate-bounce"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                    </svg>
                  </button>
                </div>
              </section>
            )}

            {/* ÜBUNG MODE */}
            {mode === "exercise" && (
              <section className="rounded-3xl bg-white/80 p-5 sm:p-8 shadow-lg ring-4 ring-white animate-fade-in space-y-6">
                <div className="flex items-center gap-3 justify-between">
                  <div className="flex items-center gap-3">
                    <div>
                      <h2 className="text-2xl font-black text-foreground">Schreibübung</h2>
                      
                    </div>
                  </div>
                  <button
                    onClick={() => setMode("learn")}
                    className="text-xs font-black text-primary hover:underline"
                  >
                    Zahlen lernen
                  </button>
                </div>

                <div className="overflow-hidden rounded-2xl border border-foreground/10 shadow-sm">
                  {/* Column labels */}
                  <div className="grid grid-cols-2 bg-foreground/5">
                    <div className="px-4 py-2 text-xs font-black text-foreground/60 uppercase tracking-wider border-r border-foreground/10">
                      Zahl
                    </div>
                    <div className="px-4 py-2 text-xs font-black text-foreground/60 uppercase tracking-wider">
                      Schreibe hier
                    </div>
                  </div>
                  {/* Rows */}
                  {numberGroups.map((num, idx) => {
                    const val = userAnswers[`num_${num.word}`] || "";
                    const correct = checkNumberAnswer(num.word, val);
                    const hasVal = val.length > 0;
                    return (
                      <div
                        key={num.n}
                        className={`grid grid-cols-2 border-t border-foreground/5 transition-colors ${
                          correct ? "bg-emerald-50" : idx % 2 === 0 ? "bg-white" : "bg-white/50"
                        }`}
                      >
                        {/* Col 1: number */}
                        <div className="px-4 py-2.5 border-r border-foreground/10 flex items-center">
                          <span className="text-2xl font-black text-foreground select-none">
                            {num.n}
                          </span>
                        </div>
                        {/* Col 2: blank input */}
                        <div className="px-4 py-2 flex items-center">
                          {correct ? (
                            <span className="text-sm font-black text-emerald-700 flex items-center gap-1">
                              {num.word} ✅
                            </span>
                          ) : (
                            <input
                              type="text"
                              value={val}
                              onChange={(e) => handleNumberInput(num.word, e.target.value)}
                              placeholder="?"
                              maxLength={20}
                              className={`w-full px-3 py-1.5 rounded-xl border-2 text-sm font-black transition-all outline-none ${
                                hasVal
                                  ? "bg-rose-100 border-rose-400 text-rose-800 animate-shake"
                                  : "bg-white border-dashed border-sky-300 focus:border-sky-50/50"
                              }`}
                            />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Completion */}
                {isNumbersComplete && (
                  <div className="mt-8 text-center bg-emerald-50 border border-emerald-100 rounded-3xl p-5 shadow-inner">
                    <p className="mt-3 text-xl font-black text-emerald-700">
                      Großartig! Du hast alle Zahlen richtig geschrieben!
                    </p>
                    <NextLessonButton currentId={lesson.id} />
                  </div>
                )}
              </section>
            )}
          </>
        ) : lessonId === "8" && numberAnwGroups ? (
          <>
            {/* ======================================================== */}
            {/* LESSON 8: ZAHLEN 11-20 & ANWENDUNGEN – LEARN + EXERCISE   */}
            {/* ======================================================== */}

            {/* LERNEN MODE */}
            {mode === "learn" && (
              <section className="rounded-3xl bg-white/80 p-5 sm:p-8 shadow-lg ring-4 ring-white animate-fade-in space-y-6">
                <div className="flex items-center gap-3">
                  <div>
                    <h2 className="text-2xl font-black text-foreground">
                      Zahlen 11–20 & Anwendungen
                    </h2>
                    
                  </div>
                </div>

                <div className="space-y-6">
                  {Array.from(new Set(numberAnwGroups.map((g) => g.category))).map((cat) => {
                    const info = catInfo[cat] || {
                      emoji: "",
                      bg: "bg-white",
                      ring: "ring-foreground/10 border-2 border-foreground/15",
                      badge: "bg-foreground",
                      text: "text-foreground",
                    };
                    const items = numberAnwGroups.filter((g) => g.category === cat);
                    return (
                      <div
                        key={cat}
                        className={`${info.bg} rounded-2xl p-4 sm:p-5 border border-foreground/10 space-y-4`}
                      >
                        <div className="flex items-center gap-3 border-b border-foreground/5 pb-2">
                          <span className="text-lg font-black text-foreground">{cat}</span>
                        </div>
                        {cat === "Zahlen 11-20" ? (
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {items.map((it) => (
                              <div
                                key={it.label}
                                role="button"
                                tabIndex={0}
                                onClick={() => speakDE(it.word)}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter" || e.key === " ") speakDE(it.word);
                                }}
                                className="bg-white rounded-xl px-3 py-2 text-sm font-bold text-foreground shadow-sm border border-foreground/10 flex items-center justify-between cursor-pointer"
                              >
                                <span className="font-black text-base">{it.label}</span>
                                <span className="opacity-80 font-bold">{it.word} 🔊</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="flex flex-col gap-2">
                            {items.map((it) => (
                              <div
                                key={it.word}
                                className="bg-white rounded-xl px-4 py-3 text-sm font-bold text-foreground shadow-sm border border-foreground/10 flex items-center justify-between gap-3 text-left"
                              >
                                <div>
                                  <span className="text-xs font-black opacity-55 mr-2">
                                    {it.label}:
                                  </span>
                                  <button
                                    onClick={() => speakDE(it.word)}
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter" || e.key === " ") speakDE(it.word);
                                    }}
                                    tabIndex={0}
                                    role="button"
                                    className="font-black text-base cursor-pointer hover:underline"
                                  >
                                    {it.word} 🔊
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-end mt-6 sm:mt-8">
                  <button
                    onClick={() => setMode("exercise")}
                    title="Übung machen"
                    className="p-4 sm:p-5 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl ring-4 ring-white transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer group"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-7 w-7 sm:h-8 sm:w-8 group-hover:animate-bounce"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                    </svg>
                  </button>
                </div>
              </section>
            )}

            {/* ÜBUNG MODE */}
            {mode === "exercise" && (
              <section className="rounded-3xl bg-white/80 p-5 sm:p-8 shadow-lg ring-4 ring-white animate-fade-in space-y-6">
                <div className="flex items-center gap-3 justify-between">
                  <div className="flex items-center gap-3">
                    <div>
                      <h2 className="text-2xl font-black text-foreground">Schreibübung</h2>
                      
                    </div>
                  </div>
                  <button
                    onClick={() => setMode("learn")}
                    className="text-xs font-black text-primary hover:underline"
                  >
                    Zahlen lernen
                  </button>
                </div>

                <div className="space-y-6">
                  {Array.from(new Set(numberAnwGroups.map((g) => g.category))).map((cat) => {
                    const info = catInfo[cat] || {
                      emoji: "",
                      bg: "bg-white",
                      ring: "ring-foreground/10 border-2 border-foreground/15",
                      badge: "bg-foreground",
                      text: "text-foreground",
                    };
                    const items = numberAnwGroups.filter((g) => g.category === cat);
                    return (
                      <div
                        key={cat}
                        className="overflow-hidden rounded-2xl border border-foreground/10 shadow-sm"
                      >
                        {/* Section header */}
                        <div className="bg-foreground/5 px-4 py-2.5 flex items-center gap-3">
                          <span className="text-foreground text-sm font-bold">{cat}</span>
                        </div>
                        {/* Column labels */}
                        <div className="grid grid-cols-2 bg-foreground/5">
                          <div className="px-4 py-2 text-xs font-black text-foreground/60 uppercase tracking-wider border-r border-foreground/10">
                            Deutsch
                          </div>
                          <div className="px-4 py-2 text-xs font-black text-foreground/60 uppercase tracking-wider">
                            Schreibe hier
                          </div>
                        </div>
                        {/* Rows */}
                        {items.map((it) => {
                          const globalIdx = numberAnwGroups.indexOf(it);
                          const key = `numanw_${it.word}_${globalIdx}`;
                          const val = userAnswers[key] || "";
                          const correct = checkNumberAnwAnswer(it.word, val);
                          const hasVal = val.length > 0;
                          return (
                            <div
                              key={`${it.word}-${globalIdx}`}
                              className={`grid grid-cols-2 border-t border-foreground/5 transition-colors ${
                                correct
                                  ? "bg-emerald-50"
                                  : globalIdx % 2 === 0
                                    ? "bg-white"
                                    : "bg-white/50"
                              }`}
                            >
                              {/* Col 1: Label / Number */}
                              <div className="px-4 py-2.5 border-r border-foreground/10 flex items-center">
                                <span className="text-sm font-black text-foreground select-none text-left">
                                  {it.label}
                                </span>
                              </div>
                              {/* Col 2: input */}
                              <div className="px-4 py-2 flex items-center">
                                {correct ? (
                                  <span className="text-sm font-black text-emerald-700 flex items-center gap-1">
                                    {it.word} ✅
                                  </span>
                                ) : (
                                  <input
                                    type="text"
                                    value={val}
                                    onChange={(e) =>
                                      handleNumberAnwInput(it.word, globalIdx, e.target.value)
                                    }
                                    placeholder="?"
                                    maxLength={30}
                                    className={`w-full px-3 py-1.5 rounded-xl border-2 text-sm font-black transition-all outline-none ${
                                      hasVal
                                        ? "bg-rose-100 border-rose-400 text-rose-800 animate-shake"
                                        : "bg-white border-dashed border-sky-300 focus:border-sky-50/50"
                                    }`}
                                  />
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>

                {/* Completion */}
                {isNumbersAnwComplete && (
                  <div className="mt-8 text-center animate-bounce bg-emerald-50 border border-emerald-100 rounded-3xl p-5 shadow-inner">
                    <div className="text-6xl">🎉😊🎉</div>
                    <p className="mt-3 text-xl font-black text-emerald-700">
                      Großartig! Du hast alle Zahlen und Anwendungen richtig geschrieben!
                    </p>
                    <NextLessonButton currentId={lesson.id} />
                  </div>
                )}
              </section>
            )}
          </>
        ) : lessonId === "9" && zeitGroups && zeitExercises ? (
          <>
            {/* ======================================================== */}
            {/* LESSON 9: ZEIT – LEARN + EXERCISE                        */}
            {/* ======================================================== */}

            {/* LERNEN MODE */}
            {mode === "learn" && (
              <section className="rounded-3xl bg-white p-5 sm:p-8 border-2 border-black animate-fade-in space-y-6">
                <div className="flex items-center gap-3">
                  <div>
                    <h2 className="text-2xl font-black text-black">Zeit</h2>
                    <p className="text-xs font-bold text-black/60">Uhrzeit und Begriffe</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {zeitGroups.map((g) => {
                    return (
                      <div
                        key={g.category}
                        className="rounded-2xl p-4 sm:p-5 border-2 border-black space-y-4"
                      >
                        <div className="flex items-center gap-3 border-b-2 border-black pb-2">
                          <span className="text-lg font-black text-black">{g.category}</span>
                        </div>
                        <div className="flex flex-col gap-2">
                          {g.items.map((it) => (
                            <div
                              key={it.word}
                              role="button"
                              tabIndex={0}
                              onClick={() => speakDE(it.word)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") speakDE(it.word);
                              }}
                              className="rounded-xl px-4 py-3 text-sm font-black text-black border-2 border-black flex items-center justify-between gap-3 text-left cursor-pointer"
                            >
                              <div>
                                {it.label !== "Frage" && it.label !== it.word && (
                                  <span className="text-xs font-black opacity-55 mr-2">
                                    {it.label}:
                                  </span>
                                )}
                                <span className="font-black text-base">{it.word} 🔊</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <button
                  onClick={() => setMode("exercise")}
                  className="w-full mt-6 py-5 px-6 rounded-none border-2 border-black bg-black text-white font-black text-xl hover:bg-white hover:text-black transition-all"
                >
                  Übung machen
                </button>
              </section>
            )}

            {/* ÜBUNG MODE */}
            {mode === "exercise" && (
              <section className="rounded-3xl bg-white p-5 sm:p-8 border-2 border-black animate-fade-in space-y-6">
                <div className="flex items-center gap-3 justify-between">
                  <div>
                    <h2 className="text-2xl font-black text-black">Schreibübung</h2>
                  </div>
                  <button
                    onClick={() => setMode("learn")}
                    className="text-xs font-black text-black border-b-2 border-black"
                  >
                    Zurück
                  </button>
                </div>

                <div className="rounded-2xl border-2 border-black p-4">
                  <p className="text-sm font-bold">Schreibe das Wort oder die Uhrzeit.</p>
                </div>

                <div className="overflow-hidden rounded-2xl border-2 border-black">
                  <div className="grid grid-cols-2 bg-black text-white">
                    <div className="px-4 py-2 text-xs font-black uppercase tracking-wider border-r border-white">
                      Deutsch
                    </div>
                    <div className="px-4 py-2 text-xs font-black uppercase tracking-wider">
                      Antwort
                    </div>
                  </div>
                  {zeitExercises.map((it, idx) => {
                    const key = `zeit_${it.word}_${idx}`;
                    const val = userAnswers[key] || "";
                    const correct = checkZeitAnswer(it.word, val);
                    return (
                      <div
                        key={`${it.word}-${idx}`}
                        className={`grid grid-cols-2 border-t-2 border-black ${correct ? "bg-black/5" : ""}`}
                      >
                        <div className="px-4 py-2.5 border-r-2 border-black flex items-center">
                          <button
                            onClick={() => speakDE(it.word)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") speakDE(it.word);
                            }}
                            tabIndex={0}
                            role="button"
                            className="text-sm font-black text-black cursor-pointer hover:underline"
                          >
                            {it.label}
                          </button>
                        </div>
                        <div className="px-4 py-2 flex items-center">
                          {correct ? (
                            <span className="text-sm font-black text-black">{it.word} ✓</span>
                          ) : (
                            <input
                              type="text"
                              value={val}
                              onChange={(e) => handleZeitInput(it.word, idx, e.target.value)}
                              className="w-full px-3 py-1.5 border-2 border-black text-sm font-black outline-none"
                            />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {isZeitComplete && (
                  <div className="mt-8 text-center border-2 border-black rounded-xl p-5">
                    <p className="text-xl font-black text-black">Sehr gut!</p>
                    <NextLessonButton currentId={lesson.id} />
                  </div>
                )}
              </section>
            )}
          </>
        ) : lessonId === "10" && reviewGroups ? (
          <>
            {/* ======================================================== */}
            {/* LESSON 10: WIEDERHOLUNG – LEARN + EXERCISE               */}
            {/* ======================================================== */}

            {/* LERNEN MODE */}
            {mode === "learn" && (
              <section className="rounded-3xl bg-white/80 p-5 sm:p-8 shadow-lg ring-4 ring-white animate-fade-in space-y-6">
                <div className="flex items-center gap-3">
                  <div>
                    <h2 className="text-2xl font-black text-foreground">Wiederholung</h2>
                    
                  </div>
                </div>

                <div className="rounded-2xl bg-foreground/5 p-4 border border-foreground/10 text-foreground">
                  <p className="text-sm font-bold">
                    Wiederhole alle bisherigen Themen und Beispiele.
                  </p>
                </div>

                <div className="space-y-6">
                  {reviewGroups.map((g, catIdx) => (
                    <div
                      key={g.category}
                      className="bg-white border border-foreground/15 rounded-2xl p-4 sm:p-5 shadow-md space-y-3"
                    >
                      <h3 className="text-lg font-black">{g.category}</h3>
                      <div className="space-y-2">
                        {g.items.map((it, itemIdx) => (
                          <div
                            key={itemIdx}
                            role="button"
                            tabIndex={0}
                            onClick={() => speakDE(it.full)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") speakDE(it.full);
                            }}
                            className="w-full bg-white rounded-xl px-4 py-2.5 text-sm font-black text-foreground shadow-sm border border-foreground/15 flex items-center justify-between cursor-pointer"
                          >
                            <span className="text-base font-black">{it.full} 🔊</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end mt-6 sm:mt-8">
                  <button
                    onClick={() => setMode("exercise")}
                    title="Übung machen"
                    className="p-4 sm:p-5 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl ring-4 ring-white transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer group"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-7 w-7 sm:h-8 sm:w-8 group-hover:animate-bounce"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                    </svg>
                  </button>
                </div>
              </section>
            )}

            {/* ÜBUNG MODE */}
            {mode === "exercise" && (
              <section className="rounded-3xl bg-white/80 p-5 sm:p-8 shadow-lg ring-4 ring-white animate-fade-in space-y-6">
                <div className="flex items-center gap-3 justify-between">
                  <div className="flex items-center gap-3">
                    <div>
                      <h2 className="text-2xl font-black text-foreground">Schreibübung</h2>
                      
                    </div>
                  </div>
                  <button
                    onClick={() => setMode("learn")}
                    className="text-xs font-black text-primary hover:underline"
                  >
                    Lernstoff ansehen
                  </button>
                </div>

                <div className="rounded-2xl bg-foreground/5 p-4 border border-foreground/10 text-foreground">
                  <p className="text-sm font-bold">
                    Schreibe die richtige Antwort für die Lücken in das Feld rechts!
                  </p>
                </div>

                <div className="space-y-6">
                  {reviewGroups.map((g, catIdx) => (
                    <div
                      key={g.category}
                      className="overflow-hidden rounded-2xl border border-foreground/10 shadow-sm"
                    >
                      {/* Section header */}
                      <div className="bg-white border-b border-foreground/15 px-4 py-2.5 flex items-center gap-3">
                        <span className="text-foreground text-base font-black">{g.category}</span>
                      </div>
                      {/* Column labels */}
                      <div className="grid grid-cols-2 bg-foreground/5">
                        <div className="px-4 py-2 text-xs font-black text-foreground/60 uppercase tracking-wider border-r border-foreground/10">
                          Frage
                        </div>
                        <div className="px-4 py-2 text-xs font-black text-foreground/60 uppercase tracking-wider">
                          Antwort
                        </div>
                      </div>
                      {/* Rows */}
                      {g.items.map((it, itemIdx) => {
                        const key = `rev_${catIdx}_${itemIdx}`;
                        const val = userAnswers[key] || "";
                        const correct = checkReviewAnswer(it.answer, val);
                        const hasVal = val.length > 0;
                        const isQuestion = it.answer.length > 0;

                        return (
                          <div
                            key={itemIdx}
                            className={`grid grid-cols-2 border-t border-foreground/5 transition-colors ${
                              !isQuestion
                                ? "bg-foreground/5 opacity-80"
                                : correct
                                  ? "bg-emerald-50"
                                  : itemIdx % 2 === 0
                                    ? "bg-white"
                                    : "bg-white/50"
                            }`}
                          >
                            {/* Col 1: Prompt */}
                            <div className="px-4 py-2.5 border-r border-foreground/10 flex items-center gap-2">
                              <button
                                onClick={() => speakDE(it.full)}
                                title={`${it.prompt} hören`}
                                className="text-sm font-black text-foreground hover:text-primary transition cursor-pointer select-none text-left"
                              >
                                {it.prompt}
                              </button>
                              <span className="text-xs text-foreground/30">🔊</span>
                            </div>
                            {/* Col 2: input / display */}
                            <div className="px-4 py-2 flex items-center">
                              {!isQuestion ? (
                                <span className="text-sm font-bold text-foreground/40 italic">
                                  Beispiel (fertig)
                                </span>
                              ) : correct ? (
                                <span className="text-sm font-black text-emerald-700 flex items-center gap-1">
                                  {it.answer} ✅
                                </span>
                              ) : (
                                <input
                                  type="text"
                                  value={val}
                                  onChange={(e) =>
                                    handleReviewInput(it.answer, catIdx, itemIdx, e.target.value)
                                  }
                                  placeholder="?"
                                  maxLength={30}
                                  className={`w-full px-3 py-1.5 rounded-xl border-2 text-sm font-black transition-all outline-none ${
                                    hasVal
                                      ? "bg-rose-100 border-rose-400 text-rose-800"
                                      : "bg-white border-dashed border-sky-300 focus:border-sky-500 focus:bg-sky-50/50"
                                  }`}
                                />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>

                {/* Completion */}
                {isReviewComplete && (
                  <div className="mt-8 text-center animate-bounce bg-emerald-50 border border-emerald-100 rounded-3xl p-5 shadow-inner">
                    <div className="text-6xl">🎉😊🎉</div>
                    <p className="mt-3 text-xl font-black text-emerald-700">
                      Großartig! Du hast die ganze Wiederholung geschafft!
                    </p>
                    <NextLessonButton currentId={lesson.id} />
                  </div>
                )}
              </section>
            )}
          </>
        ) : lessonId === "5" && lautkomGroups ? (
          <>
            {/* ======================================================== */}
            {/* LESSON 5: LAUTKOMBINATIONEN – LEARN + EXERCISE            */}
            {/* ======================================================== */}

            {/* LERNEN MODE */}
            {mode === "learn" && (
              <section className="rounded-3xl bg-white/80 p-5 sm:p-8 shadow-lg ring-4 ring-white animate-fade-in space-y-6">
                <div className="flex items-center gap-3">
                  <div>
                    <h2 className="text-2xl font-black text-foreground">Lautkombinationen</h2>
                    
                  </div>
                </div>

                {/* Combo pill strip */}
                <div className="flex gap-2 flex-wrap justify-center">
                  {lautkomGroups.map((g) => (
                    <div
                      key={g.combo}
                      className="bg-foreground text-white px-5 py-2 rounded-full text-lg font-black shadow-md select-none"
                    >
                      {g.label}
                    </div>
                  ))}
                </div>

                {/* Word groups per combination */}
                <div className="space-y-5">
                  {lautkomGroups.map((g) => {
                    return (
                      <div
                        key={g.combo}
                        className="bg-white rounded-2xl p-4 border border-foreground/10 space-y-3"
                      >
                        <div className="flex items-center gap-3">
                          <span className="bg-foreground text-white px-3 py-1 rounded-lg text-lg font-black shadow select-none">
                            {g.label}
                          </span>
                          <span className="text-base font-black text-foreground">Deutsch</span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {g.words.map((w) => (
                            <div
                              key={w}
                              role="button"
                              tabIndex={0}
                              onClick={() => speakDE(w)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") speakDE(w);
                              }}
                              className="bg-white rounded-xl px-3 py-2 text-sm font-bold text-foreground shadow-sm border border-foreground/10 text-left cursor-pointer"
                            >
                              <span>{highlightCombo(w, g.label)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-end mt-6 sm:mt-8">
                  <button
                    onClick={() => setMode("exercise")}
                    title="Übung machen"
                    className="p-4 sm:p-5 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl ring-4 ring-white transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer group"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-7 w-7 sm:h-8 sm:w-8 group-hover:animate-bounce"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                    </svg>
                  </button>
                </div>
              </section>
            )}

            {/* ÜBUNG MODE – 2-column fill-in-the-blank */}
            {mode === "exercise" && (
              <section className="rounded-3xl bg-white/80 p-5 sm:p-8 shadow-lg ring-4 ring-white animate-fade-in space-y-6">
                <div className="flex items-center gap-3 justify-between">
                  <div className="flex items-center gap-3">
                    <div>
                      <h2 className="text-2xl font-black text-foreground">Schreibübung</h2>
                      
                    </div>
                  </div>
                  <button
                    onClick={() => setMode("learn")}
                    className="text-xs font-black text-primary hover:underline"
                  >
                    Kombinationen lernen
                  </button>
                </div>

                {/* 2-column tables grouped by combination */}
                <div className="space-y-6">
                  {lautkomGroups.map((g) => {
                    return (
                      <div
                        key={g.combo}
                        className="overflow-hidden rounded-2xl border border-foreground/10 shadow-sm"
                      >
                        {/* Section header */}
                        <div className="bg-foreground/5 px-4 py-2.5 flex items-center gap-3">
                          <span className="text-foreground text-xl font-black tracking-widest">
                            {g.label}
                          </span>
                          <span className="text-foreground/60 text-sm font-bold">
                            Lautkombination – {g.label}
                          </span>
                        </div>
                        {/* Column labels */}
                        <div className="grid grid-cols-2 bg-foreground/5">
                          <div className="px-4 py-2 text-xs font-black text-foreground/60 uppercase tracking-wider border-r border-foreground/10">
                            Deutsch
                          </div>
                          <div className="px-4 py-2 text-xs font-black text-foreground/60 uppercase tracking-wider">
                            Schreibe hier
                          </div>
                        </div>
                        {/* Rows */}
                        {g.words.map((w, idx) => {
                          const val = userAnswers[`l_${w}`] || "";
                          const correct = checkLautAnswer(w, val);
                          const hasVal = val.length > 0;
                          return (
                            <div
                              key={w}
                              className={`grid grid-cols-2 border-t border-foreground/5 transition-colors ${
                                correct
                                  ? "bg-emerald-50"
                                  : idx % 2 === 0
                                    ? "bg-white"
                                    : "bg-white/50"
                              }`}
                            >
                              {/* Col 1: word with highlighted combo */}
                              <div className="px-4 py-2.5 border-r border-foreground/10 flex items-center">
                                <span className="text-sm font-black text-foreground select-none">
                                  {highlightCombo(w, g.label)}
                                </span>
                              </div>
                              {/* Col 2: blank input */}
                              <div className="px-4 py-2 flex items-center">
                                {correct ? (
                                  <span className="text-sm font-black text-emerald-700 flex items-center gap-1">
                                    {w} ✅
                                  </span>
                                ) : (
                                  <input
                                    type="text"
                                    value={val}
                                    onChange={(e) => handleLautInput(w, e.target.value)}
                                    placeholder="?"
                                    maxLength={30}
                                    className={`w-full px-3 py-1.5 rounded-xl border-2 text-sm font-black transition-all outline-none ${
                                      hasVal
                                        ? "bg-rose-100 border-rose-400 text-rose-800 animate-shake"
                                        : "bg-white border-dashed border-sky-300 focus:border-sky-500 focus:bg-sky-50/50"
                                    }`}
                                  />
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>

                {/* Completion */}
                {isLautComplete && (
                  <div className="mt-8 text-center animate-bounce bg-emerald-50 border border-emerald-100 rounded-3xl p-5 shadow-inner">
                    <div className="text-6xl">🎉😊🎉</div>
                    <p className="mt-3 text-xl font-black text-emerald-700">
                      Großartig! Du hast alle Lautkombinationen geschrieben!
                    </p>
                    <NextLessonButton currentId={lesson.id} />
                  </div>
                )}
              </section>
            )}
          </>
        ) : lessonId === "1" || lessonId === "2" ? (
          <>
            {/* LERNEN MODE (LESSON 1) */}
            {mode === "learn" && (
              <section className="rounded-3xl bg-white/80 p-5 sm:p-8 shadow-lg ring-4 ring-white animate-fade-in space-y-6">
                <div className="flex items-center gap-3">
                  <div>
                    <h2 className="text-2xl font-black text-foreground">
                      {lessonId === "2" ? "Groß- und Kleinbuchstaben" : "Das Alphabet (ABC)"}
                    </h2>
                    
                  </div>
                </div>

                {/* Rows of letters */}
                <div className="space-y-4">
                  {alphabetRows.map((row, idx) => (
                    <div key={row.id} className="space-y-1">
                      
                      <div
                        className={`grid gap-1.5 sm:gap-2`}
                        style={{
                          gridTemplateColumns: `repeat(${row.letters.length}, minmax(0, 1fr))`,
                        }}
                      >
                        {row.letters.map((letter, letterIdx) => (
                          <button
                            key={letter}
                            onClick={() => speakLessonItem(letter)}
                            className={`${palette[(idx + letterIdx) % palette.length]} flex items-center justify-center aspect-square rounded-2xl border-2 shadow-sm transition active:scale-90 group cursor-pointer`}
                          >
                            <span className="text-xl sm:text-3xl font-black group-hover:animate-bounce select-none">
                              {getLetterDisplay(letter)}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}

                  {/* Sonderbuchstaben */}
                  <div className="space-y-1 pt-2 border-t border-foreground/5">
                    
                    <div className="grid grid-cols-5 gap-2 max-w-sm">
                      {sonderRow.map((letter, letterIdx) => (
                        <button
                          key={letter}
                          onClick={() => speakLessonItem(letter)}
                          className="bg-white border-foreground/15 hover:bg-foreground/5 text-foreground flex items-center justify-center aspect-square rounded-2xl border-2 shadow-sm transition active:scale-90 group cursor-pointer"
                        >
                          <span className="text-xl sm:text-3xl font-black group-hover:animate-bounce select-none">
                            {getLetterDisplay(letter)}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Start Exercise Button */}
                <div className="flex justify-end mt-6 sm:mt-8">
                  <button
                    onClick={() => setMode("exercise")}
                    title="Übung machen"
                    className="p-4 sm:p-5 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl ring-4 ring-white transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer group"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-7 w-7 sm:h-8 sm:w-8 group-hover:animate-bounce"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                    </svg>
                  </button>
                </div>
              </section>
            )}

            {/* ÜBUNG MODE (LESSON 1) */}
            {mode === "exercise" && (
              <section className="rounded-3xl bg-white/80 p-5 sm:p-8 shadow-lg ring-4 ring-white animate-fade-in space-y-6">
                <div className="flex items-center gap-3 justify-between">
                  <div className="flex items-center gap-3">
                    <div>
                      <h2 className="text-2xl font-black text-foreground">
                        {lessonId === "2" ? "Schreibübung (A a)" : "Schreibübung (ABC)"}
                      </h2>
                      
                    </div>
                  </div>
                  <button
                    onClick={() => setMode("learn")}
                    className="text-xs font-black text-primary hover:underline"
                  >
                    {lessonId === "2" ? "Buchstaben lernen" : "ABC lernen"}
                  </button>
                </div>

                {/* Rows and matching writing blocks */}
                <div className="space-y-6">
                  {alphabetRows.map((row) => (
                    <div
                      key={row.id}
                      className="space-y-2 p-3 bg-white/40 rounded-2xl border border-foreground/5 shadow-inner"
                    >
                      {/* Row Letters Header */}
                      <div
                        className="grid gap-1.5 sm:gap-2"
                        style={{
                          gridTemplateColumns: `repeat(${row.letters.length}, minmax(0, 1fr))`,
                        }}
                      >
                        {row.letters.map((letter) => {
                          const correct = checkAnswer(letter, userAnswers[letter] || "");
                          return (
                            <div
                              key={`ref-${letter}`}
                              onClick={() => speakLessonItem(letter)}
                              className={`flex items-center justify-center aspect-square rounded-xl text-lg sm:text-2xl font-black border-2 shadow-sm select-none cursor-pointer transition active:scale-95 ${
                                correct
                                  ? "bg-emerald-500 border-emerald-600 text-white animate-pulse"
                                  : "bg-white border-foreground/15 text-foreground"
                              }`}
                            >
                              {getLetterDisplay(letter)}
                            </div>
                          );
                        })}
                      </div>

                      {/* Matching Input Row */}
                      <div
                        className="grid gap-1.5 sm:gap-2"
                        style={{
                          gridTemplateColumns: `repeat(${row.letters.length}, minmax(0, 1fr))`,
                        }}
                      >
                        {row.letters.map((letter) => {
                          const val = userAnswers[letter] || "";
                          const correct = checkAnswer(letter, val);
                          const hasVal = val.length > 0;
                          return (
                            <input
                              key={`input-${letter}`}
                              type="text"
                              maxLength={8}
                              value={val}
                              disabled={correct}
                              onChange={(e) => handleInputChange(letter, e.target.value)}
                              placeholder="?"
                              className={`w-full aspect-square text-center text-sm sm:text-base font-black rounded-xl border-2 transition-all outline-none ${
                                correct
                                  ? "bg-emerald-100 border-emerald-500 text-emerald-800 shadow-inner"
                                  : hasVal
                                    ? "bg-rose-100 border-rose-400 text-rose-800 animate-shake"
                                    : "bg-white border-dashed border-sky-300 focus:border-sky-50/50"
                              }`}
                            />
                          );
                        })}
                      </div>
                    </div>
                  ))}

                  {/* Sonderbuchstaben reference & inputs */}
                  <div className="space-y-2 p-3 bg-white rounded-2xl border border-foreground/10 shadow-inner">
                    <div className="text-[10px] font-black text-foreground/40 uppercase tracking-wider px-1">
                      Sonderbuchstaben
                    </div>
                    {/* Sonder Reference Row */}
                    <div className="grid grid-cols-5 gap-2 max-w-sm">
                      {sonderRow.map((letter) => {
                        const correct = checkAnswer(letter, userAnswers[letter] || "");
                        return (
                          <div
                            key={`ref-${letter}`}
                            onClick={() => speakLessonItem(letter)}
                            className={`flex items-center justify-center aspect-square rounded-xl text-lg sm:text-2xl font-black border-2 shadow-sm select-none cursor-pointer transition active:scale-95 ${
                              correct
                                ? "bg-emerald-500 border-emerald-600 text-white animate-pulse"
                                : "bg-white border-foreground/15 text-foreground"
                            }`}
                          >
                            {getLetterDisplay(letter)}
                          </div>
                        );
                      })}
                    </div>

                    {/* Sonder Input Row */}
                    <div className="grid grid-cols-5 gap-2 max-w-sm">
                      {sonderRow.map((letter) => {
                        const val = userAnswers[letter] || "";
                        const correct = checkAnswer(letter, val);
                        const hasVal = val.length > 0;
                        return (
                          <input
                            key={`input-${letter}`}
                            type="text"
                            maxLength={8}
                            value={val}
                            disabled={correct}
                            onChange={(e) => handleInputChange(letter, e.target.value)}
                            placeholder="?"
                            className={`w-full aspect-square text-center text-sm sm:text-base font-black rounded-xl border-2 transition-all outline-none ${
                              correct
                                ? "bg-emerald-100 border-emerald-500 text-emerald-800 shadow-inner"
                                : hasVal
                                  ? "bg-rose-100 border-rose-400 text-rose-800 animate-shake"
                                  : "bg-white border-dashed border-sky-300 focus:border-sky-50/50"
                            }`}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Celebration and next button */}
                {isABCComplete && (
                  <div className="mt-8 text-center animate-bounce bg-emerald-50 border border-emerald-100 rounded-3xl p-5 shadow-inner">
                    <div className="text-6xl">🎉😊🎉</div>
                    <p className="mt-3 text-xl font-black text-emerald-700">
                      {lessonId === "2"
                        ? "Großartig! Du hast alle Groß- und Kleinbuchstaben geschrieben!"
                        : "Großartig! Du hast das ganze ABC geschrieben!"}
                    </p>
                    <NextLessonButton currentId={lesson.id} />
                  </div>
                )}
              </section>
            )}
          </>
        ) : (
          <>
            {/* ======================================================== */}
            {/* GENERIC LESSON LAYOUT FOR ALL OTHER LESSONS              */}
            {/* ======================================================== */}
            {/* 1. LERNEN MODE */}
            {mode === "learn" && (
              <section className="rounded-3xl bg-white/80 p-6 sm:p-8 shadow-lg ring-4 ring-white animate-fade-in">
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-2xl">
                    🏫
                  </span>
                  <div>
                    <h2 className="text-2xl font-black text-foreground">Lernzeit mit dem Lehrer</h2>
                    
                  </div>
                </div>

                <div className="mt-6 rounded-2xl bg-amber-50/50 p-4 border border-amber-100">
                  
                </div>

                <div className="mt-6">
                  <h3 className="text-sm font-bold text-foreground/60 uppercase tracking-wider mb-3">
                    Tippe auf die Karten zum Hören:
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {lesson.items.map((it) => (
                      <button
                        key={it}
                        onClick={() => speakDE(it.replace(/[^\p{L}\p{N} ]/gu, "").trim() || it)}
                        className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-amber-100/80 hover:bg-amber-100 p-4 text-xl sm:text-2xl font-black shadow-md border-2 border-white transition-all hover:scale-105 active:scale-95 hover:shadow-lg group"
                      >
                        <span className="group-hover:animate-bounce">{it.split(" ")[0]}</span>
                        {it.split(" ")[1] && lessonId !== "7" && lessonId !== "8" && (
                          <span className="text-xs font-bold text-foreground/60">
                            {it.split(" ")[1]}
                          </span>
                        )}
                        <span className="text-xs opacity-75">🔊</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Start Exercise Button */}
                <div className="flex justify-end mt-6 sm:mt-8">
                  <button
                    onClick={() => setMode("exercise")}
                    title="Übung machen"
                    className="p-4 sm:p-5 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl ring-4 ring-white transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer group"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-7 w-7 sm:h-8 sm:w-8 group-hover:animate-bounce"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                    </svg>
                  </button>
                </div>
              </section>
            )}

            {/* 2. ÜBUNG MODE */}
            {mode === "exercise" && (
              <section className="rounded-3xl bg-white/80 p-6 sm:p-8 shadow-lg ring-4 ring-white animate-fade-in">
                <div className="flex items-center gap-3 justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-2xl">
                      ✏️
                    </span>
                    <div>
                      <h2 className="text-2xl font-black text-foreground">Übung machen</h2>
                      
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setMode("learn");
                      setPicked(null);
                    }}
                    className="text-xs font-black text-primary hover:underline"
                  >
                    Lernstoff ansehen
                  </button>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-lg sm:text-xl font-black text-foreground/80">{ex.prompt}</p>

                  <div className="mt-6 flex flex-col items-center gap-3">
                    <button
                      onClick={() => speakDE(ex.speak)}
                      className="flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-full bg-primary text-5xl text-primary-foreground shadow-xl hover:shadow-2xl ring-8 ring-white transition-all hover:scale-110 active:scale-90 animate-pulse cursor-pointer"
                      aria-label="Nochmal hören"
                    >
                      🔊
                    </button>
                    <span className="text-xs font-bold text-foreground/50 animate-bounce">
                      Tippe auf den Lautsprecher!
                    </span>
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-3 max-w-md mx-auto">
                  {ex.options.map((opt) => {
                    const chosen = picked === opt;
                    const correct = opt === ex.answer;
                    const showState = picked !== null && (chosen || correct);
                    const cls = showState
                      ? correct
                        ? "bg-emerald-300 border-emerald-500 text-emerald-950 scale-105"
                        : chosen
                          ? "bg-rose-300 border-rose-500 text-rose-950"
                          : "bg-sky-200 border-white text-foreground"
                      : "bg-sky-300 border-white text-foreground hover:bg-sky-200";
                    return (
                      <button
                        key={opt}
                        onClick={() => choose(opt)}
                        disabled={picked !== null && isCorrect}
                        className={`${cls} aspect-square rounded-3xl text-4xl sm:text-5xl font-black border-4 shadow-md transition-all duration-200 active:scale-95 cursor-pointer flex items-center justify-center`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {picked !== null && (
                  <div className="mt-8 text-center animate-bounce">
                    {isCorrect ? (
                      <div className="bg-emerald-50 border border-emerald-100 rounded-3xl p-5 shadow-inner">
                        <div className="text-6xl">🎉😊🎉</div>
                        <p className="mt-3 text-xl font-black text-emerald-700">
                          Super gemacht! Perfekt!
                        </p>
                        <NextLessonButton currentId={lesson.id} />
                      </div>
                    ) : (
                      <div className="bg-rose-50 border border-rose-100 rounded-3xl p-5 shadow-inner">
                        <div className="text-6xl">😢</div>
                        <p className="mt-3 text-lg font-black text-rose-700">
                          Och, schade! Versuchs noch einmal!
                        </p>
                        <button
                          onClick={() => setPicked(null)}
                          className="mt-4 rounded-full bg-primary px-6 py-2.5 text-base font-black text-primary-foreground shadow active:scale-95 transition-all hover:scale-105 cursor-pointer"
                        >
                          Nochmal versuchen
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </section>
            )}
          </>
        )}
      </div>
    </>
  );
}

function NextLessonButton({ currentId }: { currentId: string }) {
  const idx = lessons.findIndex((l) => l.id === currentId);
  const next = lessons[idx + 1];
  if (!next) {
    return (
      <Link
        to="/lessons"
        className="mt-4 inline-block rounded-full bg-emerald-600 hover:bg-emerald-700 px-6 py-3 text-base font-black text-white shadow-lg active:scale-95 transition-all hover:scale-105 cursor-pointer"
      >
        🏁 Zurück zu den Lektionen
      </Link>
    );
  }
  return (
    <Link
      to="/lessons/$lessonId"
      params={{ lessonId: next.id }}
      className="mt-4 inline-block rounded-full bg-primary px-6 py-3 text-base font-black text-primary-foreground shadow-lg active:scale-95 transition-all hover:scale-105 cursor-pointer"
    >
      Nächste Lektion →
    </Link>
  );
}
