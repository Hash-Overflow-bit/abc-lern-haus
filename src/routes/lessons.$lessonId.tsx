import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import React, { useState, useEffect } from "react";
import lessons from "@/data/lessons.json";
import { Page } from "@/components/KidNav";
import { speakDE } from "@/lib/speak";

export const Route = createFileRoute("/lessons/$lessonId")({
  head: ({ params }) => ({
    meta: [{ title: `Lektion ${params.lessonId} – Deutsch ABC` }],
  }),
  component: LessonPage,
});

const letterProns: Record<string, string> = {
  A: "ah", B: "be", C: "ce", D: "de", E: "eh", F: "eff", G: "ge",
  H: "ha", I: "ih", J: "jot", K: "ka", L: "ell", M: "emm", N: "enn",
  O: "oh", P: "pe", Q: "ku", R: "err", S: "ess", T: "te", U: "uh",
  V: "vau", W: "we", X: "ix", Y: "ypsilon", Z: "zett",
  "\u00C4": "\u00E4h", "\u00D6": "\u00F6h", "\u00DC": "\u00FCh", "\u00DF": "eszett", ss: "ss"
};

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

const palette = [
  "bg-rose-100 border-rose-300 hover:bg-rose-200 text-rose-950",
  "bg-amber-100 border-amber-300 hover:bg-amber-200 text-amber-950",
  "bg-emerald-100 border-emerald-300 hover:bg-emerald-200 text-emerald-950",
  "bg-sky-100 border-sky-300 hover:bg-sky-200 text-sky-950",
  "bg-violet-100 border-violet-300 hover:bg-violet-200 text-violet-950",
  "bg-pink-100 border-pink-300 hover:bg-pink-200 text-pink-950",
  "bg-lime-100 border-lime-300 hover:bg-lime-200 text-lime-950",
];

// Lesson 4: Vokale – vowel colour palette per vowel
const vokalColors: Record<string, { bg: string; ring: string; badge: string; text: string }> = {
  A: { bg: "bg-rose-50",   ring: "ring-rose-200",   badge: "bg-rose-500",    text: "text-rose-700" },
  E: { bg: "bg-amber-50",  ring: "ring-amber-200",  badge: "bg-amber-500",   text: "text-amber-700" },
  I: { bg: "bg-emerald-50",ring: "ring-emerald-200",badge: "bg-emerald-500", text: "text-emerald-700" },
  O: { bg: "bg-sky-50",    ring: "ring-sky-200",    badge: "bg-sky-500",     text: "text-sky-700" },
  U: { bg: "bg-violet-50", ring: "ring-violet-200", badge: "bg-violet-500",  text: "text-violet-700" },
};

// Lesson 5: Lautkombinationen – colour palette per combination
const lautkomColors: Record<string, { bg: string; ring: string; badge: string; text: string; highlight: string }> = {
  Ch:  { bg: "bg-indigo-50",  ring: "ring-indigo-200",  badge: "bg-indigo-500",  text: "text-indigo-700",  highlight: "text-indigo-600" },
  Sch: { bg: "bg-teal-50",    ring: "ring-teal-200",    badge: "bg-teal-600",    text: "text-teal-700",    highlight: "text-teal-600" },
  Ei:  { bg: "bg-orange-50",  ring: "ring-orange-200",  badge: "bg-orange-500",  text: "text-orange-700",  highlight: "text-orange-600" },
  Ie:  { bg: "bg-pink-50",    ring: "ring-pink-200",    badge: "bg-pink-500",    text: "text-pink-700",    highlight: "text-pink-600" },
  Sp:  { bg: "bg-lime-50",    ring: "ring-lime-200",    badge: "bg-lime-600",    text: "text-lime-700",    highlight: "text-lime-600" },
  St:  { bg: "bg-cyan-50",    ring: "ring-cyan-200",    badge: "bg-cyan-600",    text: "text-cyan-700",    highlight: "text-cyan-600" },
};

function LessonPage() {
  const { lessonId } = Route.useParams();

  const [mode, setMode] = useState<"learn" | "exercise">("learn");
  const [picked, setPicked] = useState<string | null>(null);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});

  // Reset page state when changing lessons
  useEffect(() => {
    setMode("learn");
    setPicked(null);
    setUserAnswers({});
  }, [lessonId]);

  const lesson = lessons.find((l) => l.id === lessonId);
  if (!lesson) throw notFound();

  const ex = lesson.exercise;
  const isCorrect = picked === ex.answer;

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
    const cleanVal = val.toLowerCase().replace(/\s+/g, "").trim();
    const letterLower = letter.toLowerCase();
    const pronLower = letterProns[letter]?.toLowerCase() || "";
    return (
      cleanVal === letterLower ||
      cleanVal === letterLower + letterLower ||
      cleanVal === pronLower
    );
  }

  function handleInputChange(letter: string, val: string) {
    const wasCorrect = checkAnswer(letter, userAnswers[letter] || "");
    const isCorrectNow = checkAnswer(letter, val);
    
    setUserAnswers(prev => ({ ...prev, [letter]: val }));
    
    if (isCorrectNow && !wasCorrect) {
      speakDE("Super!");
    }
  }

  const allLetters = [...alphabetRows.flatMap(r => r.letters), ...sonderRow];
  const isABCComplete = allLetters.every(l => checkAnswer(l, userAnswers[l] || ""));

  // Lesson 3: check fill-blank answer
  function checkWieAnswer(word: string, val: string) {
    if (!val) return false;
    return val.trim().toLowerCase() === word.toLowerCase();
  }

  function handleWieInput(letter: string, val: string) {
    const row = abcMitWieRows.find(r => r.letter === letter);
    const wasCorrect = row ? checkWieAnswer(row.word, userAnswers[`wie_${letter}`] || "") : false;
    const isNowCorrect = row ? checkWieAnswer(row.word, val) : false;
    setUserAnswers(prev => ({ ...prev, [`wie_${letter}`]: val }));
    if (isNowCorrect && !wasCorrect) speakDE("Super!");
  }

  const isWieComplete = abcMitWieRows.every(r => checkWieAnswer(r.word, userAnswers[`wie_${r.letter}`] || ""));

  // Lesson 4: Vokale helpers
  const vokalGroups = (lesson as any).vokale as { vowel: string; words: string[] }[] | undefined;

  function checkVokalAnswer(word: string, val: string) {
    if (!val) return false;
    return val.trim().toLowerCase() === word.toLowerCase();
  }

  function handleVokalInput(word: string, val: string) {
    const wasCorrect = checkVokalAnswer(word, userAnswers[`v_${word}`] || "");
    const isNowCorrect = checkVokalAnswer(word, val);
    setUserAnswers(prev => ({ ...prev, [`v_${word}`]: val }));
    if (isNowCorrect && !wasCorrect) speakDE("Super!");
  }

  const isVokaleComplete = vokalGroups
    ? vokalGroups.every(g => g.words.every(w => checkVokalAnswer(w, userAnswers[`v_${w}`] || "")))
    : false;

  // Lesson 5: Lautkombinationen helpers
  const lautkomGroups = (lesson as any).lautkom as { combo: string; label: string; words: string[] }[] | undefined;

  function checkLautAnswer(word: string, val: string) {
    if (!val) return false;
    return val.trim().toLowerCase() === word.toLowerCase();
  }

  function handleLautInput(word: string, val: string) {
    const wasCorrect = checkLautAnswer(word, userAnswers[`l_${word}`] || "");
    const isNowCorrect = checkLautAnswer(word, val);
    setUserAnswers(prev => ({ ...prev, [`l_${word}`]: val }));
    if (isNowCorrect && !wasCorrect) speakDE("Super!");
  }

  const isLautComplete = lautkomGroups
    ? lautkomGroups.every(g => g.words.every(w => checkLautAnswer(w, userAnswers[`l_${w}`] || "")))
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
    <Page title={lesson.title} emoji={lesson.emoji}>
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
              <span>📖</span>
              <span>1. Lernen</span>
            </button>
            <div className="h-1 w-4 sm:w-6 rounded bg-foreground/20"></div>
            <button
              onClick={() => setMode("exercise")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${
                mode === "exercise"
                  ? "bg-primary text-primary-foreground shadow-md scale-105 ring-2 ring-white"
                  : "bg-white/40 text-foreground/50 hover:bg-white/60"
              }`}
            >
              <span>✏️</span>
              <span>2. Üben</span>
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

            {/* LERNEN MODE – show chart images */}
            {mode === "learn" && (
              <section className="rounded-3xl bg-white/80 p-5 sm:p-8 shadow-lg ring-4 ring-white animate-fade-in space-y-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-2xl">🗣️</span>
                  <div>
                    <h2 className="text-2xl font-black text-foreground">Abc mit WIE</h2>
                    <p className="text-xs font-bold text-muted-foreground">Ein Wort für jeden Buchstaben!</p>
                  </div>
                </div>

                <div className="rounded-2xl bg-amber-50/50 p-4 border border-amber-100">
                  <p className="text-sm sm:text-base font-black text-foreground">
                    Schau dir das Bild an und lerne: jeder Buchstabe hat ein deutsches Wort!
                  </p>
                </div>

                {/* Main ABC mit WIE chart image */}
                <div className="rounded-2xl overflow-hidden border-2 border-amber-200 shadow-md">
                  <img
                    src="/abc_mit_wie_chart.png"
                    alt="ABC mit WIE – Übersicht aller Buchstaben mit deutschen Wörtern"
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Umlaute special letters image */}
                <div className="space-y-2">
                  <div className="text-[10px] font-black text-primary uppercase tracking-wider px-1 flex items-center gap-1">
                    <span>✨</span>
                    <span>Sonderbuchstaben mit WIE</span>
                  </div>
                  <div className="rounded-2xl overflow-hidden border-2 border-orange-200 shadow-md bg-white">
                    <img
                      src="/umlaute_wie_cards.png"
                      alt="Ä wie Äpfel, Ö wie Öl, Ü wie Übersetzen"
                      className="w-full h-auto object-contain"
                    />
                  </div>
                </div>

                {/* Clickable word cards */}
                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-foreground/60 uppercase tracking-wider">Tippe auf die Karten zum Hören:</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {abcMitWieRows.map((row, idx) => (
                      <button
                        key={row.letter}
                        onClick={() => speakDE(row.word)}
                        className={`${palette[idx % palette.length]} flex items-center gap-2 rounded-2xl border-2 px-3 py-2 shadow-sm transition hover:scale-105 active:scale-95 cursor-pointer text-left`}
                      >
                        <span className="text-xl font-black w-8 shrink-0">{row.letter}</span>
                        <span className="text-xs font-bold opacity-60">wie</span>
                        <span className="text-sm font-black">{row.word}</span>
                        <span className="ml-auto text-xs">🔊</span>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setMode("exercise")}
                  className="w-full mt-6 py-5 px-6 rounded-3xl bg-gradient-to-r from-primary to-orange-400 text-white font-black text-xl sm:text-2xl shadow-xl hover:shadow-2xl ring-4 ring-white transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 select-none cursor-pointer group"
                >
                  <span>✏️ Übung machen!</span>
                  <span className="text-2xl transition-transform group-hover:translate-x-1">➔</span>
                </button>
              </section>
            )}

            {/* ÜBUNG MODE – fill-in-the-blank table */}
            {mode === "exercise" && (
              <section className="rounded-3xl bg-white/80 p-5 sm:p-8 shadow-lg ring-4 ring-white animate-fade-in space-y-6">
                <div className="flex items-center gap-3 justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-2xl">✏️</span>
                    <div>
                      <h2 className="text-2xl font-black text-foreground">Schreibübung</h2>
                      <p className="text-xs font-bold text-muted-foreground">Fülle die leeren Felder aus!</p>
                    </div>
                  </div>
                  <button onClick={() => setMode("learn")} className="text-xs font-black text-primary hover:underline">
                    Wörter lernen
                  </button>
                </div>

                <div className="rounded-2xl bg-sky-50/50 p-4 border border-sky-100">
                  <p className="text-sm font-bold text-foreground/80">
                    Schreibe das richtige deutsche Wort in das leere Feld.
                    z.B. <code className="bg-sky-200/50 px-1.5 py-0.5 rounded font-black">A wie Apfel</code>
                  </p>
                </div>

                {/* Fill-in-the-blank table */}
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gradient-to-r from-primary/10 to-orange-100">
                        <th className="text-left px-4 py-3 text-sm font-black text-foreground/70 rounded-tl-2xl w-16">Abc</th>
                        <th className="text-left px-4 py-3 text-sm font-black text-foreground/70">wie</th>
                        <th className="text-left px-4 py-3 text-sm font-black text-foreground/70 rounded-tr-2xl">Deutsch</th>
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
                              correct ? "bg-emerald-50" : idx % 2 === 0 ? "bg-white/60" : "bg-white/30"
                            }`}
                          >
                            <td className="px-4 py-2">
                              <button
                                onClick={() => speakDE(row.word)}
                                className="text-2xl font-black text-primary hover:scale-110 transition active:scale-90 cursor-pointer select-none"
                                title={`${row.letter} wie ${row.word} hören`}
                              >
                                {row.letter}
                              </button>
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
                                  onChange={e => handleWieInput(row.letter, e.target.value)}
                                  placeholder="?"
                                  maxLength={20}
                                  className={`w-full max-w-[200px] px-3 py-1.5 rounded-xl border-2 text-sm font-black transition-all outline-none ${
                                    hasVal
                                      ? "bg-rose-100 border-rose-400 text-rose-800"
                                      : "bg-white border-dashed border-sky-300 focus:border-sky-500 focus:bg-sky-50/50"
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
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-2xl">🔵</span>
                  <div>
                    <h2 className="text-2xl font-black text-foreground">Vokale</h2>
                    <p className="text-xs font-bold text-muted-foreground">Die Vokale im Deutschen</p>
                  </div>
                </div>

                {/* Vowel bubbles strip */}
                <div className="flex gap-3 justify-center flex-wrap">
                  {vokalGroups.map(g => (
                    <button
                      key={g.vowel}
                      onClick={() => speakDE(g.vowel)}
                      className={`${vokalColors[g.vowel].badge} text-white w-14 h-14 rounded-full text-3xl font-black shadow-lg hover:scale-110 active:scale-90 transition cursor-pointer select-none flex items-center justify-center`}
                    >
                      {g.vowel}
                    </button>
                  ))}
                </div>

                <div className="rounded-2xl bg-blue-50/60 p-4 border border-blue-100">
                  <p className="text-sm font-bold text-foreground/80">
                    Vokale – ihre Laute im Deutschen. Tippe auf ein Wort, um es zu hören! 🔊
                  </p>
                </div>

                {/* Word groups per vowel */}
                <div className="space-y-5">
                  {vokalGroups.map(g => {
                    const c = vokalColors[g.vowel];
                    return (
                      <div key={g.vowel} className={`${c.bg} rounded-2xl p-4 ring-2 ${c.ring} space-y-3`}>
                        {/* Vowel badge + header */}
                        <div className="flex items-center gap-3">
                          <span className={`${c.badge} text-white w-10 h-10 rounded-xl text-xl font-black flex items-center justify-center shadow select-none`}>
                            {g.vowel}
                          </span>
                          <div>
                            <div className={`text-lg font-black ${c.text}`}>{g.vowel} – Deutsch</div>
                          </div>
                        </div>
                        {/* Word grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {g.words.map(w => (
                            <button
                              key={w}
                              onClick={() => speakDE(w)}
                              className="bg-white/80 hover:bg-white rounded-xl px-3 py-2 text-sm font-black text-foreground shadow-sm border border-white hover:scale-105 active:scale-95 transition cursor-pointer text-left flex items-center justify-between gap-1"
                            >
                              <span>{w}</span>
                              <span className="text-xs opacity-50">🔊</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <button
                  onClick={() => setMode("exercise")}
                  className="w-full mt-6 py-5 px-6 rounded-3xl bg-gradient-to-r from-primary to-orange-400 text-white font-black text-xl sm:text-2xl shadow-xl hover:shadow-2xl ring-4 ring-white transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 select-none cursor-pointer group"
                >
                  <span>✏️ Übung machen!</span>
                  <span className="text-2xl transition-transform group-hover:translate-x-1">➔</span>
                </button>
              </section>
            )}

            {/* ÜBUNG MODE – 2-column fill-in-the-blank */}
            {mode === "exercise" && (
              <section className="rounded-3xl bg-white/80 p-5 sm:p-8 shadow-lg ring-4 ring-white animate-fade-in space-y-6">
                <div className="flex items-center gap-3 justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-2xl">✏️</span>
                    <div>
                      <h2 className="text-2xl font-black text-foreground">Schreibübung</h2>
                      <p className="text-xs font-bold text-muted-foreground">Fülle die leeren Felder aus!</p>
                    </div>
                  </div>
                  <button onClick={() => setMode("learn")} className="text-xs font-black text-primary hover:underline">
                    Vokale lernen
                  </button>
                </div>

                <div className="rounded-2xl bg-sky-50/50 p-4 border border-sky-100">
                  <p className="text-sm font-bold text-foreground/80">
                    Lies das Wort links und schreibe es in das leere Feld rechts!
                  </p>
                </div>

                {/* 2-column table grouped by vowel */}
                <div className="space-y-6">
                  {vokalGroups.map(g => {
                    const c = vokalColors[g.vowel];
                    return (
                      <div key={g.vowel} className="overflow-hidden rounded-2xl border border-foreground/10 shadow-sm">
                        {/* Vowel section header */}
                        <div className={`${c.badge} px-4 py-2 flex items-center gap-3`}>
                          <span className="text-white text-2xl font-black">{g.vowel}</span>
                          <span className="text-white/80 text-sm font-bold">Vokale – {g.vowel}</span>
                        </div>
                        {/* Column headers */}
                        <div className="grid grid-cols-2 bg-foreground/5">
                          <div className="px-4 py-2 text-xs font-black text-foreground/60 uppercase tracking-wider border-r border-foreground/10">Deutsch</div>
                          <div className="px-4 py-2 text-xs font-black text-foreground/60 uppercase tracking-wider">Schreibe hier</div>
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
                                correct ? "bg-emerald-50" : idx % 2 === 0 ? "bg-white" : "bg-white/50"
                              }`}
                            >
                              {/* Column 1: German word */}
                              <div className="px-4 py-2.5 border-r border-foreground/10 flex items-center gap-2">
                                <button
                                  onClick={() => speakDE(w)}
                                  title={`${w} hören`}
                                  className="text-sm font-black text-foreground hover:text-primary transition cursor-pointer select-none"
                                >
                                  {w}
                                </button>
                                <span className="text-xs text-foreground/30">🔊</span>
                              </div>
                              {/* Column 2: Blank input */}
                              <div className="px-4 py-2 flex items-center">
                                {correct ? (
                                  <span className="text-sm font-black text-emerald-700 flex items-center gap-1">
                                    {w} ✅
                                  </span>
                                ) : (
                                  <input
                                    type="text"
                                    value={val}
                                    onChange={e => handleVokalInput(w, e.target.value)}
                                    placeholder="?"
                                    maxLength={25}
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
                    );
                  })}
                </div>

                {/* Completion */}
                {isVokaleComplete && (
                  <div className="mt-8 text-center animate-bounce bg-emerald-50 border border-emerald-100 rounded-3xl p-5 shadow-inner">
                    <div className="text-6xl">🎉😊🎉</div>
                    <p className="mt-3 text-xl font-black text-emerald-700">
                      Großartig! Du hast alle Vokale geschrieben!
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
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-2xl">🔤</span>
                  <div>
                    <h2 className="text-2xl font-black text-foreground">Lautkombinationen</h2>
                    <p className="text-xs font-bold text-muted-foreground">Lerne Lautkombinationen im Deutschen</p>
                  </div>
                </div>

                {/* Combo pill strip */}
                <div className="flex gap-2 flex-wrap justify-center">
                  {lautkomGroups.map(g => (
                    <button
                      key={g.combo}
                      onClick={() => speakDE(g.label)}
                      className={`${lautkomColors[g.combo].badge} text-white px-5 py-2 rounded-full text-lg font-black shadow-md hover:scale-110 active:scale-90 transition cursor-pointer select-none`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>

                <div className="rounded-2xl bg-indigo-50/60 p-4 border border-indigo-100">
                  <p className="text-sm font-bold text-foreground/80">
                    Tippe auf ein Wort, um es zu hören! Die Lautkombination ist <span className="underline decoration-2">unterstrichen</span>. 🔊
                  </p>
                </div>

                {/* Word groups per combination */}
                <div className="space-y-5">
                  {lautkomGroups.map(g => {
                    const c = lautkomColors[g.combo];
                    return (
                      <div key={g.combo} className={`${c.bg} rounded-2xl p-4 ring-2 ${c.ring} space-y-3`}>
                        <div className="flex items-center gap-3">
                          <span className={`${c.badge} text-white px-3 py-1 rounded-lg text-lg font-black shadow select-none`}>
                            {g.label}
                          </span>
                          <span className={`text-base font-black ${c.text}`}>Deutsch</span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {g.words.map(w => (
                            <button
                              key={w}
                              onClick={() => speakDE(w)}
                              className="bg-white/80 hover:bg-white rounded-xl px-3 py-2 text-sm font-bold text-foreground shadow-sm border border-white hover:scale-105 active:scale-95 transition cursor-pointer text-left flex items-center justify-between gap-1"
                            >
                              <span>{highlightCombo(w, g.label)}</span>
                              <span className="text-xs opacity-40">🔊</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <button
                  onClick={() => setMode("exercise")}
                  className="w-full mt-6 py-5 px-6 rounded-3xl bg-gradient-to-r from-primary to-orange-400 text-white font-black text-xl sm:text-2xl shadow-xl hover:shadow-2xl ring-4 ring-white transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 select-none cursor-pointer group"
                >
                  <span>✏️ Übung machen!</span>
                  <span className="text-2xl transition-transform group-hover:translate-x-1">➔</span>
                </button>
              </section>
            )}

            {/* ÜBUNG MODE – 2-column fill-in-the-blank */}
            {mode === "exercise" && (
              <section className="rounded-3xl bg-white/80 p-5 sm:p-8 shadow-lg ring-4 ring-white animate-fade-in space-y-6">
                <div className="flex items-center gap-3 justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-2xl">✏️</span>
                    <div>
                      <h2 className="text-2xl font-black text-foreground">Schreibübung</h2>
                      <p className="text-xs font-bold text-muted-foreground">Fülle die leeren Felder aus!</p>
                    </div>
                  </div>
                  <button onClick={() => setMode("learn")} className="text-xs font-black text-primary hover:underline">
                    Kombinationen lernen
                  </button>
                </div>

                <div className="rounded-2xl bg-sky-50/50 p-4 border border-sky-100">
                  <p className="text-sm font-bold text-foreground/80">
                    Lies das Wort links und schreibe es in das leere Feld rechts!
                  </p>
                </div>

                {/* 2-column tables grouped by combination */}
                <div className="space-y-6">
                  {lautkomGroups.map(g => {
                    const c = lautkomColors[g.combo];
                    return (
                      <div key={g.combo} className="overflow-hidden rounded-2xl border border-foreground/10 shadow-sm">
                        {/* Section header */}
                        <div className={`${c.badge} px-4 py-2.5 flex items-center gap-3`}>
                          <span className="text-white text-xl font-black tracking-widest">{g.label}</span>
                          <span className="text-white/80 text-sm font-bold">Lautkombination – {g.label}</span>
                        </div>
                        {/* Column labels */}
                        <div className="grid grid-cols-2 bg-foreground/5">
                          <div className="px-4 py-2 text-xs font-black text-foreground/60 uppercase tracking-wider border-r border-foreground/10">Deutsch</div>
                          <div className="px-4 py-2 text-xs font-black text-foreground/60 uppercase tracking-wider">Schreibe hier</div>
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
                                correct ? "bg-emerald-50" : idx % 2 === 0 ? "bg-white" : "bg-white/50"
                              }`}
                            >
                              {/* Col 1: word with highlighted combo */}
                              <div className="px-4 py-2.5 border-r border-foreground/10 flex items-center gap-2">
                                <button
                                  onClick={() => speakDE(w)}
                                  title={`${w} hören`}
                                  className={`text-sm font-black text-foreground hover:${c.text} transition cursor-pointer select-none`}
                                >
                                  {highlightCombo(w, g.label)}
                                </button>
                                <span className="text-xs text-foreground/30">🔊</span>
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
                                    onChange={e => handleLautInput(w, e.target.value)}
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
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-2xl">
                    🏫
                  </span>
                  <div>
                    <h2 className="text-2xl font-black text-foreground">
                      {lessonId === "2" ? "Groß- und Kleinbuchstaben" : "Das Alphabet (ABC)"}
                    </h2>
                    <p className="text-xs font-bold text-muted-foreground">
                      {lessonId === "2" ? "Lerne alle Groß- und Kleinbuchstaben!" : "Lerne alle Buchstaben auf Deutsch!"}
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl bg-amber-50/50 p-4 border border-amber-100">
                  <p className="text-sm sm:text-base font-black text-foreground">
                    {lessonId === "2" ? (
                      "Tippe auf jeden Buchstaben, um zu hören, wie er gesprochen wird und wie die Groß- und Kleinschreibung aussieht!"
                    ) : (
                      "Das deutsche Alphabet hat 26 Standardbuchstaben und 5 Sonderbuchstaben. Tippe auf jeden Buchstaben, um zu hören, wie er gesprochen wird!"
                    )}
                  </p>
                </div>

                {/* Rows of letters */}
                <div className="space-y-4">
                  {alphabetRows.map((row, idx) => (
                    <div key={row.id} className="space-y-1">
                      <div className="text-[10px] font-bold text-foreground/40 uppercase tracking-wider px-1">
                        {row.label}
                      </div>
                      <div className={`grid gap-1.5 sm:gap-2`} style={{ gridTemplateColumns: `repeat(${row.letters.length}, minmax(0, 1fr))` }}>
                        {row.letters.map((letter, letterIdx) => (
                          <button
                            key={letter}
                            onClick={() => speakDE(letterProns[letter] || letter)}
                            className={`${palette[(idx + letterIdx) % palette.length]} flex flex-col items-center justify-center aspect-square rounded-2xl border-2 shadow-sm transition active:scale-90 group cursor-pointer py-1`}
                          >
                            <span className="text-xl sm:text-3xl font-black group-hover:animate-bounce select-none">
                              {getLetterDisplay(letter)}
                            </span>
                            <span className="text-[8px] sm:text-[10px] font-bold opacity-60 select-none">
                              {letterProns[letter]}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}

                  {/* Sonderbuchstaben */}
                  <div className="space-y-1 pt-2 border-t border-foreground/5">
                    <div className="text-[10px] font-black text-primary uppercase tracking-wider px-1 flex items-center gap-1">
                      <span>✨</span>
                      <span>Sonderbuchstaben</span>
                    </div>
                    <div className="grid grid-cols-5 gap-2 max-w-sm">
                      {sonderRow.map((letter, letterIdx) => (
                        <button
                          key={letter}
                          onClick={() => speakDE(letterProns[letter] || letter)}
                          className="bg-orange-100 border-orange-300 hover:bg-orange-200 text-orange-950 flex flex-col items-center justify-center aspect-square rounded-2xl border-2 shadow-sm transition active:scale-90 group cursor-pointer py-1"
                        >
                          <span className="text-xl sm:text-3xl font-black group-hover:animate-bounce select-none">
                            {getLetterDisplay(letter)}
                          </span>
                          <span className="text-[8px] sm:text-[10px] font-bold opacity-65 select-none">
                            {letterProns[letter]}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Start Exercise Button */}
                <button
                  onClick={() => setMode("exercise")}
                  className="w-full mt-6 py-5 px-6 rounded-3xl bg-gradient-to-r from-primary to-orange-400 text-white font-black text-xl sm:text-2xl shadow-xl hover:shadow-2xl ring-4 ring-white transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 select-none cursor-pointer group"
                >
                  <span>✏️ Übung machen!</span>
                  <span className="text-2xl transition-transform group-hover:translate-x-1">➔</span>
                </button>
              </section>
            )}

            {/* ÜBUNG MODE (LESSON 1) */}
            {mode === "exercise" && (
              <section className="rounded-3xl bg-white/80 p-5 sm:p-8 shadow-lg ring-4 ring-white animate-fade-in space-y-6">
                <div className="flex items-center gap-3 justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-2xl">
                      ✏️
                    </span>
                    <div>
                      <h2 className="text-2xl font-black text-foreground">
                        {lessonId === "2" ? "Schreibübung (A a)" : "Schreibübung (ABC)"}
                      </h2>
                      <p className="text-xs font-bold text-muted-foreground">Fülle die leeren Felder aus!</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setMode("learn")}
                    className="text-xs font-black text-primary hover:underline"
                  >
                    {lessonId === "2" ? "Buchstaben lernen" : "ABC lernen"}
                  </button>
                </div>

                <div className="rounded-2xl bg-sky-50/50 p-4 border border-sky-100">
                  <p className="text-sm font-bold text-foreground/80">
                    {lessonId === "2" ? (
                      <>
                        Schreibe die passenden Buchstaben in die leeren Blöcke (z.B. <code className="bg-sky-200/50 px-1.5 py-0.5 rounded font-black">A a</code>, <code className="bg-sky-200/50 px-1.5 py-0.5 rounded font-black">a</code> oder den Namen <code className="bg-sky-200/50 px-1.5 py-0.5 rounded font-black">ah</code>).
                      </>
                    ) : (
                      <>
                        Schreibe den passenden Buchstaben in die leeren Blöcke (z.B. <code className="bg-sky-200/50 px-1.5 py-0.5 rounded font-black">A</code> oder den Namen <code className="bg-sky-200/50 px-1.5 py-0.5 rounded font-black">ah</code>).
                      </>
                    )}
                  </p>
                </div>

                {/* Rows and matching writing blocks */}
                <div className="space-y-6">
                  {alphabetRows.map((row) => (
                    <div key={row.id} className="space-y-2 p-3 bg-white/40 rounded-2xl border border-foreground/5 shadow-inner">
                      {/* Row Letters Header */}
                      <div className="grid gap-1.5 sm:gap-2" style={{ gridTemplateColumns: `repeat(${row.letters.length}, minmax(0, 1fr))` }}>
                        {row.letters.map((letter) => {
                          const correct = checkAnswer(letter, userAnswers[letter] || "");
                          return (
                            <div
                              key={`ref-${letter}`}
                              onClick={() => speakDE(letterProns[letter] || letter)}
                              className={`flex items-center justify-center h-10 sm:h-12 rounded-xl text-lg sm:text-2xl font-black border shadow-sm select-none cursor-pointer transition active:scale-95 ${
                                correct ? "bg-emerald-500 border-emerald-600 text-white animate-pulse" : "bg-sky-100 border-sky-200 text-sky-950"
                              }`}
                            >
                              {getLetterDisplay(letter)}
                            </div>
                          );
                        })}
                      </div>

                      {/* Matching Input Row */}
                      <div className="grid gap-1.5 sm:gap-2" style={{ gridTemplateColumns: `repeat(${row.letters.length}, minmax(0, 1fr))` }}>
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
                              className={`w-full h-10 sm:h-12 text-center text-sm sm:text-base font-black rounded-xl border-2 transition-all outline-none ${
                                correct
                                  ? "bg-emerald-100 border-emerald-500 text-emerald-800 shadow-inner"
                                  : hasVal
                                    ? "bg-rose-100 border-rose-400 text-rose-800"
                                    : "bg-white border-dashed border-sky-300 focus:border-sky-500 focus:bg-sky-50/50"
                              }`}
                            />
                          );
                        })}
                      </div>
                    </div>
                  ))}

                  {/* Sonderbuchstaben reference & inputs */}
                  <div className="space-y-2 p-3 bg-orange-50/20 rounded-2xl border border-orange-200/50 shadow-inner">
                    <div className="text-[10px] font-black text-orange-600 uppercase tracking-wider px-1">
                      Sonderbuchstaben
                    </div>
                    {/* Sonder Reference Row */}
                    <div className="grid grid-cols-5 gap-2 max-w-sm">
                      {sonderRow.map((letter) => {
                        const correct = checkAnswer(letter, userAnswers[letter] || "");
                        return (
                          <div
                            key={`ref-${letter}`}
                            onClick={() => speakDE(letterProns[letter] || letter)}
                            className={`flex items-center justify-center h-10 sm:h-12 rounded-xl text-lg sm:text-2xl font-black border shadow-sm select-none cursor-pointer transition active:scale-95 ${
                              correct ? "bg-emerald-500 border-emerald-600 text-white animate-pulse" : "bg-orange-100 border-orange-200 text-orange-950"
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
                            className={`w-full h-10 sm:h-12 text-center text-sm sm:text-base font-black rounded-xl border-2 transition-all outline-none ${
                              correct
                                ? "bg-emerald-100 border-emerald-500 text-emerald-800 shadow-inner"
                                : hasVal
                                  ? "bg-rose-100 border-rose-400 text-rose-800"
                                  : "bg-white border-dashed border-orange-300 focus:border-orange-500 focus:bg-orange-50/50"
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
                      {lessonId === "2" ? "Großartig! Du hast alle Groß- und Kleinbuchstaben geschrieben!" : "Großartig! Du hast das ganze ABC geschrieben!"}
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
                    <p className="text-xs font-bold text-muted-foreground">Der Lehrer zeigt dir das Thema</p>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl bg-amber-50/50 p-4 border border-amber-100">
                  <p className="text-base sm:text-lg font-black text-foreground">{lesson.intro}</p>
                </div>

                <div className="mt-6">
                  <h3 className="text-sm font-bold text-foreground/60 uppercase tracking-wider mb-3">Tippe auf die Karten zum Hören:</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {lesson.items.map((it) => (
                      <button
                        key={it}
                        onClick={() => speakDE(it.replace(/[^\p{L}\p{N} ]/gu, "").trim() || it)}
                        className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-amber-100/80 hover:bg-amber-100 p-4 text-xl sm:text-2xl font-black shadow-md border-2 border-white transition-all hover:scale-105 active:scale-95 hover:shadow-lg group"
                      >
                        <span className="group-hover:animate-bounce">{it.split(" ")[0]}</span>
                        {it.split(" ")[1] && <span className="text-xs font-bold text-foreground/60">{it.split(" ")[1]}</span>}
                        <span className="text-xs opacity-75">🔊</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Start Exercise Button */}
                <button
                  onClick={() => setMode("exercise")}
                  className="w-full mt-8 py-5 px-6 rounded-3xl bg-gradient-to-r from-primary to-orange-400 text-white font-black text-xl sm:text-2xl shadow-xl hover:shadow-2xl ring-4 ring-white transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 select-none cursor-pointer group"
                >
                  <span>✏️ Übung machen!</span>
                  <span className="text-2xl transition-transform group-hover:translate-x-1">➔</span>
                </button>
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
                      <p className="text-xs font-bold text-muted-foreground">Finde die richtige Antwort!</p>
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
                    <span className="text-xs font-bold text-foreground/50 animate-bounce">Tippe auf den Lautsprecher!</span>
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
                        <p className="mt-3 text-xl font-black text-emerald-700">Super gemacht! Perfekt!</p>
                        <NextLessonButton currentId={lesson.id} />
                      </div>
                    ) : (
                      <div className="bg-rose-50 border border-rose-100 rounded-3xl p-5 shadow-inner">
                        <div className="text-6xl">😢</div>
                        <p className="mt-3 text-lg font-black text-rose-700">Och, schade! Versuchs noch einmal!</p>
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
    </Page>
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
