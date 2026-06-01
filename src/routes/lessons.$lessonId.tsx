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

function LessonPage() {
  const { lessonId } = Route.useParams();

  const [mode, setMode] = useState<"learn" | "exercise">("learn");
  const [picked, setPicked] = useState<string | null>(null);

  // Reset page state when changing lessons
  useEffect(() => {
    setMode("learn");
    setPicked(null);
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