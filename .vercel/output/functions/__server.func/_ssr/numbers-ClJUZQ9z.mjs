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
const numbers = [
  {
    n: 0,
    word: "null"
  },
  {
    n: 1,
    word: "eins"
  },
  {
    n: 2,
    word: "zwei"
  },
  {
    n: 3,
    word: "drei"
  },
  {
    n: 4,
    word: "vier"
  },
  {
    n: 5,
    word: "fünf"
  },
  {
    n: 6,
    word: "sechs"
  },
  {
    n: 7,
    word: "sieben"
  },
  {
    n: 8,
    word: "acht"
  },
  {
    n: 9,
    word: "neun"
  },
  {
    n: 10,
    word: "zehn"
  },
  {
    n: 11,
    word: "elf"
  },
  {
    n: 12,
    word: "zwölf"
  },
  {
    n: 13,
    word: "dreizehn"
  },
  {
    n: 14,
    word: "vierzehn"
  },
  {
    n: 15,
    word: "fünfzehn"
  },
  {
    n: 16,
    word: "sechzehn"
  },
  {
    n: 17,
    word: "siebzehn"
  },
  {
    n: 18,
    word: "achtzehn"
  },
  {
    n: 19,
    word: "neunzehn"
  },
  {
    n: 20,
    word: "zwanzig"
  }
];
const palette = ["bg-amber-300", "bg-emerald-300", "bg-sky-300", "bg-rose-300", "bg-violet-300"];
function NumbersPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-2xl space-y-6 pb-10 mt-14", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-black mb-6", children: "Zahlen 0–20" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3 sm:grid-cols-4", children: numbers.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => speakDE(`${item.n}, ${item.word}`), className: `${palette[i % palette.length]} flex aspect-square items-center justify-center rounded-3xl shadow-md ring-4 ring-white transition active:scale-90`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-5xl font-black text-foreground", children: item.n }) }, item.n)) })
  ] });
}
export {
  NumbersPage as component
};
