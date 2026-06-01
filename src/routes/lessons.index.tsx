import { createFileRoute, Link } from "@tanstack/react-router";
import lessons from "@/data/lessons.json";
import { Page } from "@/components/KidNav";

export const Route = createFileRoute("/lessons/")({
  head: () => ({ meta: [{ title: "Lektionen – Deutsch ABC" }] }),
  component: LessonsIndexPage,
});

const palette = [
  "bg-rose-300", "bg-amber-300", "bg-emerald-300", "bg-sky-300",
  "bg-violet-300", "bg-pink-300", "bg-lime-300", "bg-orange-300",
  "bg-teal-300", "bg-fuchsia-300",
];

function LessonsIndexPage() {
  return (
    <Page title="Lektionen" emoji="🎓">
      <ul className="mx-auto grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2 pb-10">
        {lessons.map((l, i) => (
          <li key={l.id}>
            <Link
              to="/lessons/$lessonId"
              params={{ lessonId: l.id }}
              className={`${palette[i % palette.length]} flex items-center gap-4 rounded-3xl p-4 shadow-md ring-4 ring-white transition active:scale-[0.98] hover:scale-[1.02] cursor-pointer`}
            >
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-3xl select-none">
                {l.emoji}
              </span>
              <div className="min-w-0">
                <div className="text-xs font-bold text-foreground/60">Lektion {l.id}</div>
                <div className="truncate text-lg font-black text-foreground">{l.title}</div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Page>
  );
}
