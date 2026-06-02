import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import alphabet from "@/data/alphabet.json";
import { speakDE } from "@/lib/speak";

export const Route = createFileRoute("/listening")({
  head: () => ({ meta: [{ title: "Hören – Deutsch ABC" }] }),
  component: ListeningPage,
});

function pickRound() {
  const pool = [...alphabet].sort(() => Math.random() - 0.5);
  const options = pool.slice(0, 4);
  const answer = options[Math.floor(Math.random() * options.length)];
  return { options, answer };
}

function ListeningPage() {
  const [round, setRound] = useState(() => pickRound());
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [score, setScore] = useState({ ok: 0, no: 0 });

  useEffect(() => {
    const t = setTimeout(() => speakDE(round.answer), 300);
    return () => clearTimeout(t);
  }, [round]);

  function choose(letter: string) {
    if (letter === round.answer) {
      setFeedback("correct");
      setScore((s) => ({ ...s, ok: s.ok + 1 }));
      setTimeout(() => { setFeedback(null); setRound(pickRound()); }, 900);
    } else {
      setFeedback("wrong");
      setScore((s) => ({ ...s, no: s.no + 1 }));
      setTimeout(() => setFeedback(null), 700);
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 pb-10 mt-14">
      <h1 className="text-2xl font-black mb-6">Hör-Übung</h1>
      <div className="flex items-center justify-between rounded-2xl bg-white/70 px-4 py-2 text-lg font-bold">
        <span>✅ {score.ok}</span>
        <span>❌ {score.no}</span>
      </div>

      <div className="mt-6 flex flex-col items-center gap-4">
        <button
          onClick={() => speakDE(round.answer)}
          className="flex h-32 w-32 items-center justify-center rounded-full bg-primary text-6xl text-primary-foreground shadow-xl ring-8 ring-white transition active:scale-95"
          aria-label="Buchstabe nochmal hören"
        >
          🔊
        </button>
        <p className="text-base font-semibold text-foreground/60">Welcher Buchstabe?</p>
      </div>

      <div className="mx-auto mt-6 grid max-w-md grid-cols-2 gap-4">
        {round.options.map((l) => (
          <button
            key={l}
            onClick={() => choose(l)}
            className="aspect-square rounded-3xl bg-sky-300 text-6xl font-black text-foreground shadow-md ring-4 ring-white transition active:scale-90"
          >
            {l}
          </button>
        ))}
      </div>

      {feedback && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/20 pointer-events-none">
          <div className="text-[10rem] animate-bounce">
            {feedback === "correct" ? "😊" : "😢"}
          </div>
        </div>
      )}
    </div>
  );
}