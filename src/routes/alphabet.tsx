import { createFileRoute } from "@tanstack/react-router";
import alphabet from "@/data/alphabet.json";
import { Page } from "@/components/KidNav";
import { speakDE } from "@/lib/speak";

export const Route = createFileRoute("/alphabet")({
  head: () => ({ meta: [{ title: "Alphabet – Deutsch ABC" }] }),
  component: AlphabetPage,
});

const palette = [
  "bg-rose-300", "bg-amber-300", "bg-emerald-300",
  "bg-sky-300", "bg-violet-300", "bg-pink-300", "bg-lime-300",
];

function AlphabetPage() {
  return (
    <Page title="Alphabet" emoji="🔤">
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
        {alphabet.map((l, i) => (
          <button
            key={l}
            onClick={() => speakDE(l)}
            className={`${palette[i % palette.length]} aspect-square rounded-3xl text-5xl font-black text-foreground shadow-md ring-4 ring-white transition active:scale-90`}
          >
            {l}
          </button>
        ))}
      </div>
    </Page>
  );
}