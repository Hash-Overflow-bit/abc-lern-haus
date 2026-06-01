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
    <nav className="fixed left-2 sm:left-3 md:left-4 top-2 sm:top-3 md:top-4 bottom-2 sm:bottom-3 md:bottom-4 z-50 w-14 sm:w-16 md:w-20 rounded-[1.5rem] md:rounded-[2.2rem] border-2 border-white bg-white/80 backdrop-blur-md shadow-xl flex flex-col justify-between py-4 select-none overflow-y-auto scrollbar-none">
      <ul className="w-full flex flex-col items-stretch gap-1 px-1 sm:px-1.5">
        {items.map((i) => (
          <li key={i.to}>
            <Link
              to={i.to}
              className="flex flex-col items-center gap-0.5 md:gap-1 rounded-xl sm:rounded-2xl px-1 py-2 text-[9px] md:text-[11px] font-black text-foreground/75 hover:text-foreground transition-all duration-200 hover:scale-105 active:scale-90 hover:bg-black/5"
              activeProps={{ className: "bg-primary/15! text-primary! scale-105 shadow-sm" }}
              activeOptions={{ exact: i.to === "/" }}
            >
              <span className="text-2xl sm:text-3xl leading-none select-none">{i.emoji}</span>
              <span className="hidden sm:inline">{i.label}</span>
              <span className="inline sm:hidden text-[7px] font-bold leading-none">{i.label.substring(0, 4)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Page({ title, emoji, children }: { title: string; emoji: string; children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-rose-50 pl-20 sm:pl-24 md:pl-28 pr-3 sm:pr-4 py-4">
      <header className="px-2 md:px-5 pt-3 md:pt-6 pb-2">
        <h1 className="text-2xl md:text-4xl font-black tracking-tight text-foreground flex items-center gap-2 select-none">
          <span className="text-3xl md:text-5xl">{emoji}</span>
          <span>{title}</span>
        </h1>
      </header>
      <div className="px-2 md:px-4">{children}</div>
      <KidNav />
    </main>
  );
}