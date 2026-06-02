import { createFileRoute } from "@tanstack/react-router";
import numbers from "@/data/numbers.json";
import { Page } from "@/components/KidNav";
import { speakDE } from "@/lib/speak";

export const Route = createFileRoute("/numbers")({
  head: () => ({ meta: [{ title: "Zahlen – Deutsch ABC" }] }),
  component: NumbersPage,
});

const palette = ["bg-amber-300","bg-emerald-300","bg-sky-300","bg-rose-300","bg-violet-300"];

function NumbersPage() {
  return (
    <Page title="Zahlen 0–20" emoji="🔢">
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
        {numbers.map((item, i) => (
          <button
            key={item.n}
            onClick={() => speakDE(`${item.n}, ${item.word}`)}
            className={`${palette[i % palette.length]} flex aspect-square items-center justify-center rounded-3xl shadow-md ring-4 ring-white transition active:scale-90`}
          >
            <span className="text-5xl font-black text-foreground">{item.n}</span>
          </button>
        ))}
      </div>
    </Page>
  );
}