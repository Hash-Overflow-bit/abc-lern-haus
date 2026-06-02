import { createFileRoute } from "@tanstack/react-router";
import { speakDE } from "@/lib/speak";

export const Route = createFileRoute("/alphabet")({
  head: () => ({ meta: [{ title: "Alphabet – Deutsch ABC" }] }),
  component: AlphabetPage,
});

// Letters only — pronunciation is handled centrally by speakDE()
const letters = [
  "A","B","C","D","E","F","G","H","I","J","K","L","M",
  "N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
  "Ä","Ö","Ü","ß",
] as const;

const palette = [
  "bg-rose-300", "bg-amber-300", "bg-emerald-300",
  "bg-sky-300", "bg-violet-300", "bg-pink-300", "bg-lime-300",
];

function AlphabetPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6 pb-10 mt-14">
      <h1 className="text-2xl font-black mb-6">Alphabet</h1>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 pb-10">
        {letters.map((letter, i) => (
          <button
            key={letter}
            onClick={() => speakDE(letter)}
            className={`${palette[i % palette.length]} flex items-center justify-center aspect-square rounded-3xl p-2 shadow-md hover:shadow-lg ring-4 ring-white transition-all hover:scale-105 active:scale-95 cursor-pointer group`}
          >
            <span className="text-4xl sm:text-5xl font-black text-foreground group-hover:animate-bounce select-none">
              {letter}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

