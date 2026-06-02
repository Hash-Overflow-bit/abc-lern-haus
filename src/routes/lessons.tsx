import { createFileRoute, Outlet, Link, useLocation } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import lessons from "@/data/lessons.json";

export const Route = createFileRoute("/lessons")({
  component: LessonsLayout,
});

function LessonsLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { pathname } = useLocation();

  // Extract active lesson id from /lessons/1, /lessons/2, etc.
  const activeLessonId = pathname.match(/\/lessons\/(\w+)/)?.[1];

  // Auto-close sidebar when navigating (e.g. after tapping a lesson on mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ────────────── Fixed Top Bar ────────────── */}
      <header className="fixed inset-x-0 top-0 h-14 bg-white border-b border-gray-200 z-50 flex items-center px-4 gap-3 shadow-sm">
        {/* Hamburger – mobile only */}
        <button
          id="hamburger-btn"
          onClick={() => setSidebarOpen((v) => !v)}
          aria-label="Menü öffnen"
          className="lg:hidden p-2 -ml-1 rounded-lg text-gray-500 hover:bg-gray-100 transition active:scale-90"
        >
          {sidebarOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* Brand */}
        <span className="font-black text-gray-900 text-lg select-none tracking-tight">
          Deutsch <span className="text-primary">ABC</span>
        </span>

        {/* Current lesson name – shown on medium screens next to hamburger */}
        {activeLessonId && (
          <span className="ml-1 text-sm text-gray-400 font-semibold truncate hidden sm:block lg:hidden">
            · {lessons.find((l) => l.id === activeLessonId)?.title}
          </span>
        )}
      </header>

      {/* ────────────── Mobile backdrop ────────────── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 top-14 bg-black/40 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ────────────── Sidebar ────────────── */}
      <aside
        id="course-sidebar"
        className={[
          // Base – always fixed, starts below the header
          "fixed top-14 left-0 bottom-0 w-72 bg-white border-r border-gray-200 overflow-y-auto z-40",
          "transition-transform duration-300 ease-in-out",
          // Mobile: hidden off-screen unless open; Desktop: always visible
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        ].join(" ")}
      >
        <div className="py-5 px-3">
          {/* Course meta */}
          <div className="px-2 mb-4">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Kurs</p>
            <p className="text-sm font-bold text-gray-800 mt-0.5">Deutsch Grundlagen</p>
          </div>

          <div className="h-px bg-gray-100 mb-3 mx-1" />

          {/* Lesson list */}
          <nav aria-label="Lektionen-Navigation">
            {lessons.map((lesson) => {
              const isActive = activeLessonId === lesson.id;
              return (
                <Link
                  key={lesson.id}
                  to="/lessons/$lessonId"
                  params={{ lessonId: lesson.id }}
                  className={[
                    "group flex items-center gap-3 px-3 py-3 rounded-xl mb-0.5 transition-all duration-150",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                  ].join(" ")}
                >
                  {/* Number bubble */}
                  <span
                    className={[
                      "flex-shrink-0 w-7 h-7 rounded-full text-xs font-black flex items-center justify-center transition-all",
                      isActive
                        ? "bg-primary text-white shadow-sm"
                        : "bg-gray-100 text-gray-500 group-hover:bg-gray-200",
                    ].join(" ")}
                  >
                    {lesson.id}
                  </span>

                  {/* Title */}
                  <span
                    className={`text-sm leading-tight ${isActive ? "font-black" : "font-semibold"}`}
                  >
                    {`Lektion${lesson.id}`}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Footer spacer */}
          <div className="h-6" />
        </div>
      </aside>

      {/* ────────────── Main content area ────────────── */}
      {/* pt-14 = below fixed header; lg:ml-72 = beside fixed sidebar on desktop */}
      <main className="pt-14 lg:ml-72 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
