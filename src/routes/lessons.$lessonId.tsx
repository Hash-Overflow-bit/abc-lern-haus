import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
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
  const lesson = lessons.find((l) => l.id === lessonId);
  if (!lesson) throw notFound();

  const [picked, setPicked] = useState<string | null>(null);
  const ex = lesson.exercise;
  const isCorrect = picked === ex.answer;

  function choose(opt: string) {
    setPicked(opt);
    if (opt === ex.answer) {
      // celebrate
      speakDE("Super!");
    } else {
      speakDE("Nochmal!");
    }
  }

  return (
    <Page title={lesson.title} emoji={lesson.emoji}>
      <div className="mx-auto max-w-2xl space-y-6">
        <Link
          to="/lessons"
          className="inline-flex items-center gap-1 rounded-full bg-white/80 px-3 py-1 text-sm font-bold text-foreground/70 shadow"
        >
          ← Lektionen
        </Link>

        <section className="rounded-3xl bg-white/80 p-5 shadow-md ring-4 ring-white">
          <h2 className="text-xl font-black">📖 Lerne</h2>
          <p className="mt-1 text-sm text-foreground/70">{lesson.intro}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {lesson.items.map((it) => (
              <button
                key={it}
                onClick={() => speakDE(it.replace(/[^\p{L}\p{N} ]/gu, "").trim() || it)}
                className="rounded-2xl bg-amber-200 px-4 py-3 text-lg font-bold shadow ring-2 ring-white transition active:scale-95"
              >
                {it} 🔊
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-3xl bg-white/80 p-5 shadow-md ring-4 ring-white">
          <h2 className="text-xl font-black">✏️ Übung</h2>
          <p className="mt-1 text-sm text-foreground/70">{ex.prompt}</p>

          <div className="mt-4 flex flex-col items-center gap-3">
            <button
              onClick={() => speakDE(ex.speak)}
              className="flex h-24 w-24 items-center justify-center rounded-full bg-primary text-5xl text-primary-foreground shadow-xl ring-8 ring-white transition active:scale-95"
              aria-label="Nochmal hören"
            >
              🔊
            </button>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            {ex.options.map((opt) => {
              const chosen = picked === opt;
              const correct = opt === ex.answer;
              const showState = picked !== null && (chosen || correct);
              const cls = showState
                ? correct
                  ? "bg-emerald-300 ring-emerald-500"
                  : chosen
                    ? "bg-rose-300 ring-rose-500"
                    : "bg-sky-200 ring-white"
                : "bg-sky-300 ring-white";
              return (
                <button
                  key={opt}
                  onClick={() => choose(opt)}
                  disabled={picked !== null && isCorrect}
                  className={`${cls} aspect-square rounded-3xl text-5xl font-black text-foreground shadow ring-4 transition active:scale-95`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {picked !== null && (
            <div className="mt-5 text-center">
              {isCorrect ? (
                <div>
                  <div className="text-6xl">😊</div>
                  <p className="mt-2 font-black text-emerald-700">Super gemacht!</p>
                  <NextLessonButton currentId={lesson.id} />
                </div>
              ) : (
                <div>
                  <div className="text-6xl">😢</div>
                  <button
                    onClick={() => setPicked(null)}
                    className="mt-3 rounded-full bg-primary px-5 py-2 text-sm font-bold text-primary-foreground shadow active:scale-95"
                  >
                    Nochmal versuchen
                  </button>
                </div>
              )}
            </div>
          )}
        </section>
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
        className="mt-3 inline-block rounded-full bg-primary px-5 py-2 text-sm font-bold text-primary-foreground shadow active:scale-95"
      >
        🏁 Zurück zu den Lektionen
      </Link>
    );
  }
  return (
    <Link
      to="/lessons/$lessonId"
      params={{ lessonId: next.id }}
      className="mt-3 inline-block rounded-full bg-primary px-5 py-2 text-sm font-bold text-primary-foreground shadow active:scale-95"
    >
      Nächste Lektion →
    </Link>
  );
}