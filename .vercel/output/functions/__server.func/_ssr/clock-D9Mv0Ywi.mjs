import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { s as speakDE } from "./router-FKn1rZPS.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__react-router.mjs";
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
const clock = [
  {
    label: "1:00",
    speak: "Es ist ein Uhr"
  },
  {
    label: "2:00",
    speak: "Es ist zwei Uhr"
  },
  {
    label: "3:00",
    speak: "Es ist drei Uhr"
  },
  {
    label: "4:30",
    speak: "Es ist halb fünf"
  },
  {
    label: "5:15",
    speak: "Es ist Viertel nach fünf"
  },
  {
    label: "6:45",
    speak: "Es ist Viertel vor sieben"
  },
  {
    label: "7:00",
    speak: "Es ist sieben Uhr"
  },
  {
    label: "9:00",
    speak: "Es ist neun Uhr"
  },
  {
    label: "12:00",
    speak: "Es ist zwölf Uhr Mittag"
  }
];
const palette = ["bg-violet-300", "bg-sky-300", "bg-emerald-300", "bg-amber-300", "bg-rose-300"];
function ClockPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-2xl space-y-6 pb-10 mt-14", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-black mb-6", children: "Uhrzeit" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-3 sm:grid-cols-2", children: clock.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => speakDE(c.speak), className: `${palette[i % palette.length]} flex items-center justify-between rounded-3xl px-6 py-5 text-left shadow-md ring-4 ring-white transition active:scale-95`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl font-black text-foreground", children: c.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-sm font-semibold text-foreground/70", children: c.speak })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl", children: "🔊" })
    ] }, c.label)) })
  ] });
}
export {
  ClockPage as component
};
