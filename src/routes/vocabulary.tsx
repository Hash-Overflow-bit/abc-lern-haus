import { createFileRoute } from "@tanstack/react-router";
import vocab from "@/data/vocabulary.json";
import { Page } from "@/components/KidNav";
import { speakDE } from "@/lib/speak";

export const Route = createFileRoute("/vocabulary")({
  head: () => ({ meta: [{ title: "Wörter – Deutsch ABC" }] }),
  component: VocabularyPage,
});

const palette = ["bg-rose-200","bg-amber-200","bg-emerald-200","bg-sky-200","bg-violet-200","bg-pink-200"];

function VocabularyPage() {
  return (
    <Page title="Wörter" emoji="📚">
      <div className="grid grid-cols-2 gap-4">
        {vocab.map((v, i) => (
          <button
            key={v.word}
            onClick={() => speakDE(v.word)}
            className={`${palette[i % palette.length]} flex aspect-square flex-col items-center justify-center gap-1 rounded-3xl shadow-md ring-4 ring-white transition active:scale-95`}
          >
            <span className="text-6xl">{v.emoji}</span>
            <span className="text-xl font-black text-foreground">{v.word}</span>
          </button>
        ))}
      </div>
    </Page>
  );
}