import { createFileRoute } from "@tanstack/react-router";
import { speakDE } from "@/lib/speak";

export const Route = createFileRoute("/alphabet")({
  head: () => ({ meta: [{ title: "Alphabet – Deutsch ABC" }] }),
  component: AlphabetPage,
});

const alphabetDetails = [
  { letter: "A", pron: "ah" },
  { letter: "B", pron: "be" },
  { letter: "C", pron: "ce" },
  { letter: "D", pron: "de" },
  { letter: "E", pron: "eh" },
  { letter: "F", pron: "eff" },
  { letter: "G", pron: "ge" },
  { letter: "H", pron: "ha" },
  { letter: "I", pron: "ih" },
  { letter: "J", pron: "jot" },
  { letter: "K", pron: "ka" },
  { letter: "L", pron: "ell" },
  { letter: "M", pron: "emm" },
  { letter: "N", pron: "enn" },
  { letter: "O", pron: "oh" },
  { letter: "P", pron: "pe" },
  { letter: "Q", pron: "ku" },
  { letter: "R", pron: "err" },
  { letter: "S", pron: "ess" },
  { letter: "T", pron: "te" },
  { letter: "U", pron: "uh" },
  { letter: "V", pron: "vau" },
  { letter: "W", pron: "we" },
  { letter: "X", pron: "ix" },
  { letter: "Y", pron: "ypsilon" },
  { letter: "Z", pron: "zett" },
  { letter: "Ä", pron: "äh" },
  { letter: "Ö", pron: "öh" },
  { letter: "Ü", pron: "üh" },
  { letter: "ß", pron: "eszett" },
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
        {alphabetDetails.map((item, i) => (
          <button
            key={item.letter}
            onClick={() => speakDE(item.pron)}
            className={`${palette[i % palette.length]} flex items-center justify-center aspect-square rounded-3xl p-2 shadow-md hover:shadow-lg ring-4 ring-white transition-all hover:scale-105 active:scale-95 cursor-pointer group`}
          >
            <span className="text-4xl sm:text-5xl font-black text-foreground group-hover:animate-bounce select-none">
              {item.letter}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
