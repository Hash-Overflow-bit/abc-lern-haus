import { createFileRoute } from "@tanstack/react-router";
import clock from "@/data/clock.json";
import { speakDE } from "@/lib/speak";

export const Route = createFileRoute("/clock")({
  head: () => ({ meta: [{ title: "Uhrzeit – Deutsch ABC" }] }),
  component: ClockPage,
});

const palette = ["bg-violet-300","bg-sky-300","bg-emerald-300","bg-amber-300","bg-rose-300"];

function ClockPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6 pb-10 mt-14">
      <h1 className="text-2xl font-black mb-6">Uhrzeit</h1>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {clock.map((c, i) => (
          <button
            key={c.label}
            onClick={() => speakDE(c.speak)}
            className={`${palette[i % palette.length]} flex items-center justify-between rounded-3xl px-6 py-5 text-left shadow-md ring-4 ring-white transition active:scale-95`}
          >
            <div>
              <div className="text-4xl font-black text-foreground">{c.label}</div>
              <div className="mt-1 text-sm font-semibold text-foreground/70">{c.speak}</div>
            </div>
            <span className="text-4xl">🔊</span>
          </button>
        ))}
      </div>
    </div>
  );
}
