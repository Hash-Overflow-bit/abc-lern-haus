import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { KidNav } from "@/components/KidNav";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Deutsch ABC für Kinder" },
      { name: "description", content: "Spielerisch Deutsch lernen: Alphabet, Zahlen, Wörter, Hören und Uhrzeit." },
    ],
  }),
  component: Index,
});

const tiles = [
  { to: "/alphabet", label: "Alphabet", emoji: "🔤", bg: "bg-rose-300" },
  { to: "/numbers", label: "Zahlen", emoji: "🔢", bg: "bg-amber-300" },
  { to: "/vocabulary", label: "Wörter", emoji: "📚", bg: "bg-emerald-300" },
  { to: "/listening", label: "Hören", emoji: "👂", bg: "bg-sky-300" },
  { to: "/clock", label: "Uhrzeit", emoji: "🕐", bg: "bg-violet-300" },
  { to: "/lessons", label: "Lektionen", emoji: "🎓", bg: "bg-pink-300" },
] as const;

function Index() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-100 via-rose-100 to-violet-100 pl-20">
      <header className="px-5 pt-10 pb-4 text-center">
        <h1 className="text-5xl font-black tracking-tight text-foreground">
          Deutsch <span className="text-primary">ABC</span>
        </h1>
        <p className="mt-2 text-lg font-semibold text-foreground/70">für Kinder 🧒</p>
      </header>
      <div className="mx-auto grid max-w-2xl grid-cols-2 gap-4 px-4 pt-4">
        {tiles.map((t) => (
          <Link
            key={t.to}
            to={t.to}
            className={`${t.bg} flex aspect-square flex-col items-center justify-center gap-2 rounded-3xl shadow-lg shadow-black/10 ring-4 ring-white transition active:scale-95`}
          >
            <span className="text-6xl">{t.emoji}</span>
            <span className="text-xl font-black text-foreground">{t.label}</span>
          </Link>
        ))}
      </div>
      <KidNav />
    </main>
  );
}
