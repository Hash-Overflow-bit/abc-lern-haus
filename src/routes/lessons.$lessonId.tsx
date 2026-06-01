import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState, useEffect } from "react";
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
  Ä: "äh", Ö: "öh", Ü: "üh", ß: "eszett", ss: "ss"
};

const alphabetRows = [
  { id: "row1", label: "A bis G", letters: ["A", "B", "C", "D", "E", "F", "G"] },
  { id: "row2", label: "H bis P", letters: ["H", "I", "J", "K", "L", "M", "N", "O", "P"] },
  { id: "row3", label: "Q bis W", letters: ["Q", "R", "S", "T", "U", "V", "W"] },
  { id: "row4", label: "X bis Z", letters: ["X", "Y", "Z"] },
];

const sonderRow = ["Ä", "Ö", "Ü", "ß", "ss"];
const palette = [
  "bg-rose-100 border-rose-300 hover:bg-rose-200 text-rose-950",
  "bg-amber-100 border-amber-300 hover:bg-amber-200 text-amber-950",
  "bg-emerald-100 border-emerald-300 hover:bg-emerald-200 text-emerald-950",
  "bg-sky-100 border-sky-300 hover:bg-sky-200 text-sky-950",
  "bg-violet-100 border-violet-300 hover:bg-violet-200 text-violet-950",
  "bg-pink-100 border-pink-300 hover:bg-pink-200 text-pink-950",
  "bg-lime-100 border-lime-300 hover:bg-lime-200 text-lime-950",
];

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

  // Answer validation for Lesson 1
  function checkAnswer(letter: string, val: string) {
    if (!val) return false;
    const cleanVal = val.toLowerCase().trim();
    const letterLower = letter.toLowerCase();
    const pronLower = letterProns[letter]?.toLowerCase() || "";
    return cleanVal === letterLower || cleanVal === pronLower;
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
        {/* LESSON 1 CUSTOM ALPHABET GRID LAYOUT                     */}
        {/* ======================================================== */}
        {lessonId === "1" ? (
          <>
            {/* LERNEN MODE (LESSON 1) */}
            {mode === "learn" && (
              <section className="rounded-3xl bg-white/80 p-5 sm:p-8 shadow-lg ring-4 ring-white animate-fade-in space-y-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-2xl">
                    🏫
                  </span>
                  <div>
                    <h2 className="text-2xl font-black text-foreground">Das Alphabet (ABC)</h2>
                    <p className="text-xs font-bold text-muted-foreground">Lerne alle Buchstaben auf Deutsch!</p>
                  </div>
                </div>

                <div className="rounded-2xl bg-amber-50/50 p-4 border border-amber-100">
                  <p className="text-sm sm:text-base font-black text-foreground">
                    Das deutsche Alphabet hat 26 Standardbuchstaben und 5 Sonderbuchstaben.
                    Tippe auf jeden Buchstaben, um zu hören, wie er gesprochen wird!
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
                              {letter}
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
                            {letter}
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
                      <h2 className="text-2xl font-black text-foreground">Schreibübung (ABC)</h2>
                      <p className="text-xs font-bold text-muted-foreground">Fülle die leeren Felder aus!</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setMode("learn")}
                    className="text-xs font-black text-primary hover:underline"
                  >
                    ABC lernen
                  </button>
                </div>

                <div className="rounded-2xl bg-sky-50/50 p-4 border border-sky-100">
                  <p className="text-sm font-bold text-foreground/80">
                    Schreibe den passenden Buchstaben in die leeren Blöcke (z.B. <code className="bg-sky-200/50 px-1.5 py-0.5 rounded font-black">A</code> oder den Namen <code className="bg-sky-200/50 px-1.5 py-0.5 rounded font-black">ah</code>).
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
                              {letter}
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
                            {letter}
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
                    <p className="mt-3 text-xl font-black text-emerald-700">Großartig! Du hast das ganze ABC geschrieben!</p>
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
