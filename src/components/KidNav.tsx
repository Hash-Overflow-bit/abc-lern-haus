import { Link } from "@tanstack/react-router";

const items = [
  { to: "/", label: "Start", emoji: "🏠" },
  { to: "/alphabet", label: "ABC", emoji: "🔤" },
  { to: "/numbers", label: "Zahlen", emoji: "🔢" },
  { to: "/vocabulary", label: "Wörter", emoji: "📚" },
  { to: "/listening", label: "Hören", emoji: "👂" },
  { to: "/clock", label: "Uhr", emoji: "🕐" },
  { to: "/lessons", label: "Lektion", emoji: "🎓" },
] as const;

export function KidNav() {
  return (
    <nav className="fixed left-0 top-0 bottom-0 z-50 w-20 border-r-4 border-primary bg-white/95 backdrop-blur overflow-y-auto">
      <ul className="flex flex-col items-stretch gap-1 px-1 py-3">
        {items.map((i) => (
          <li key={i.to}>
            <Link
              to={i.to}
              className="flex flex-col items-center gap-0.5 rounded-2xl px-1 py-2 text-[10px] font-bold text-foreground transition active:scale-95"
              activeProps={{ className: "bg-primary/15 text-primary" }}
              activeOptions={{ exact: i.to === "/" }}
            >
              <span className="text-3xl leading-none">{i.emoji}</span>
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
    <main className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-rose-50 pl-20">
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