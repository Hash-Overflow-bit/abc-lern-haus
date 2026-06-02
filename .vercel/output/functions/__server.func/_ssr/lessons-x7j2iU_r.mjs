import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useLocation, L as Link, O as Outlet } from "../_libs/tanstack__react-router.mjs";
import { l as lessons } from "./lessons-C9xw10UW.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
function LessonsLayout() {
  const [sidebarOpen, setSidebarOpen] = reactExports.useState(false);
  const {
    pathname
  } = useLocation();
  const activeLessonId = pathname.match(/\/lessons\/(\w+)/)?.[1];
  reactExports.useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-gray-50", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "fixed inset-x-0 top-0 h-14 bg-white border-b border-gray-200 z-50 flex items-center px-4 gap-3 shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { id: "hamburger-btn", onClick: () => setSidebarOpen((v) => !v), "aria-label": "Menü öffnen", className: "lg:hidden p-2 -ml-1 rounded-lg text-gray-500 hover:bg-gray-100 transition active:scale-90", children: sidebarOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2, children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M6 18L18 6M6 6l12 12" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2, children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M4 6h16M4 12h16M4 18h16" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-black text-gray-900 text-lg select-none tracking-tight", children: [
        "Deutsch ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "ABC" })
      ] }),
      activeLessonId && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1 text-sm text-gray-400 font-semibold truncate hidden sm:block lg:hidden", children: [
        "· ",
        lessons.find((l) => l.id === activeLessonId)?.title
      ] })
    ] }),
    sidebarOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 top-14 bg-black/40 z-30 lg:hidden", onClick: () => setSidebarOpen(false) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { id: "course-sidebar", className: [
      // Base – always fixed, starts below the header
      "fixed top-14 left-0 bottom-0 w-72 bg-white border-r border-gray-200 overflow-y-auto z-40",
      "transition-transform duration-300 ease-in-out",
      // Mobile: hidden off-screen unless open; Desktop: always visible
      sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
    ].join(" "), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-5 px-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-2 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-black text-gray-400 uppercase tracking-widest", children: "Kurs" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-gray-800 mt-0.5", children: "Deutsch Grundlagen" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px bg-gray-100 mb-3 mx-1" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { "aria-label": "Lektionen-Navigation", children: lessons.map((lesson) => {
        const isActive = activeLessonId === lesson.id;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/lessons/$lessonId", params: {
          lessonId: lesson.id
        }, className: ["group flex items-center gap-3 px-3 py-3 rounded-xl mb-0.5 transition-all duration-150", isActive ? "bg-primary/10 text-primary" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"].join(" "), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: ["flex-shrink-0 w-7 h-7 rounded-full text-xs font-black flex items-center justify-center transition-all", isActive ? "bg-primary text-white shadow-sm" : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"].join(" "), children: lesson.id }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-sm leading-tight ${isActive ? "font-black" : "font-semibold"}`, children: lesson.title })
        ] }, lesson.id);
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "pt-14 lg:ml-72 min-h-screen", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) }) })
  ] });
}
export {
  LessonsLayout as component
};
