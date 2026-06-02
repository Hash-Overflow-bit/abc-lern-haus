import { Link, useLocation } from "@tanstack/react-router";
import { useState, useEffect } from "react";

const subItems = [
  { to: "/lessons", label: "Lektionen", emoji: "🎓" },
  { to: "/alphabet", label: "ABC", emoji: "🔤" },
  { to: "/numbers", label: "Zahlen", emoji: "🔢" },
] as const;

export function KidNav() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;

  const isHomeActive = pathname === "/";
  const isLessonActive = pathname.startsWith("/lessons") ||
    ["/alphabet", "/numbers"].includes(pathname);

  // Close sub-menu if clicking outside of the navigation item
  useEffect(() => {
    if (!isOpen) return;
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".lektion-nav-container")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen]);

  return (
    <nav className="fixed left-2 sm:left-3 md:left-4 top-2 sm:top-3 md:top-4 bottom-2 sm:bottom-3 md:bottom-4 z-50 w-14 sm:w-16 md:w-20 rounded-[1.5rem] md:rounded-[2.2rem] border-2 border-white bg-white/80 backdrop-blur-md shadow-xl flex flex-col py-4 select-none">
      <ul className="w-full flex flex-col items-stretch gap-3 px-1 sm:px-1.5">
        {/* Home Link */}
        <li>
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className={`flex flex-col items-center gap-0.5 md:gap-1 rounded-xl sm:rounded-2xl px-1 py-2 text-[9px] md:text-[11px] font-black transition-all duration-200 hover:scale-105 active:scale-90 hover:bg-black/5 ${
              isHomeActive ? "bg-primary/15 text-primary scale-105 shadow-sm" : "text-foreground/75 hover:text-foreground"
            }`}
          >
            <span className="text-2xl sm:text-3xl leading-none select-none">🏠</span>
            <span className="hidden sm:inline">Home</span>
            <span className="inline sm:hidden text-[7px] font-bold leading-none">Home</span>
          </Link>
        </li>

        {/* Lektionen Link with Sub-menu */}
        <li className="relative lektion-nav-container">
          <Link
            to="/lessons"
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(!isOpen);
            }}
            className={`flex flex-col items-center gap-0.5 md:gap-1 rounded-xl sm:rounded-2xl px-1 py-2 text-[9px] md:text-[11px] font-black transition-all duration-200 hover:scale-105 active:scale-90 hover:bg-black/5 ${
              isLessonActive ? "bg-primary/15 text-primary scale-105 shadow-sm" : "text-foreground/75 hover:text-foreground"
            }`}
          >
            <span className="text-2xl sm:text-3xl leading-none select-none">🎓</span>
            <span className="hidden sm:inline">Lektion</span>
            <span className="inline sm:hidden text-[7px] font-bold leading-none">Lekt</span>
          </Link>

          {/* Sub-menu Flyout */}
          <div
            className={`absolute left-[110%] top-0 ml-2 z-50 flex flex-col gap-1.5 p-2 bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl border-2 border-white shadow-2xl w-28 sm:w-32 md:w-36 transition-all duration-300 transform origin-left ${
              isOpen
                ? "opacity-100 scale-100 pointer-events-auto translate-x-0"
                : "opacity-0 scale-95 pointer-events-none -translate-x-2"
            }`}
          >
            {subItems.map((s) => {
              const isSubActive = pathname === s.to || (s.to === "/lessons" && pathname.startsWith("/lessons/"));
              return (
                <Link
                  key={s.to}
                  to={s.to}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-2 rounded-xl px-2 py-1.5 text-[10px] sm:text-xs md:text-sm font-black transition-all hover:bg-black/5 active:scale-95 ${
                    isSubActive ? "bg-primary/10 text-primary" : "text-foreground/80 hover:text-foreground"
                  }`}
                >
                  <span className="text-lg sm:text-xl leading-none select-none">{s.emoji}</span>
                  <span>{s.label}</span>
                </Link>
              );
            })}
          </div>
        </li>
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