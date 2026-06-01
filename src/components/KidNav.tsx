import { Link } from "@tanstack/react-router";

const items = [
  { to: "/", label: "Start", emoji: "🏠" },
  { to: "/alphabet", label: "ABC", emoji: "🔤" },
  { to: "/numbers", label: "Zahlen", emoji: "🔢" },
  { to: "/vocabulary", label: "Wörter", emoji: "📚" },
  { to: "/listening", label: "Hören", emoji: "👂" },
  { to: "/clock", label: "Uhr", emoji: "🕐" },
] as const;

export function KidNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t-4 border-primary bg-white/95 backdrop-blur">
      <ul className="mx-auto flex max-w-2xl items-stretch justify-around px-1 py-2">
        {items.map((i) => (
          <li key={i.to}>
            <Link
              to={i.to}
              className="flex flex-col items-center gap-0.5 rounded-2xl px-2 py-1.5 text-xs font-bold text-foreground transition active:scale-95"
              activeProps={{ className: "bg-primary/15 text-primary" }}
              activeOptions={{ exact: i.to === "/" }}
            >
              <span className="text-2xl leading-none">{i.emoji}</span>
              <span>{i.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Page({ title, emoji, children }: { title: string; emoji: string; children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-rose-50 pb-28">
      <header className="px-5 pt-6 pb-3">
        <h1 className="text-3xl font-black tracking-tight text-foreground">
          <span className="mr-2">{emoji}</span>{title}
        </h1>
      </header>
      <div className="px-4">{children}</div>
      <KidNav />
    </main>
  );
}