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
const alphabetDetails = [{
  letter: "A",
  pron: "ah"
}, {
  letter: "B",
  pron: "be"
}, {
  letter: "C",
  pron: "ce"
}, {
  letter: "D",
  pron: "de"
}, {
  letter: "E",
  pron: "eh"
}, {
  letter: "F",
  pron: "eff"
}, {
  letter: "G",
  pron: "ge"
}, {
  letter: "H",
  pron: "ha"
}, {
  letter: "I",
  pron: "ih"
}, {
  letter: "J",
  pron: "jot"
}, {
  letter: "K",
  pron: "ka"
}, {
  letter: "L",
  pron: "ell"
}, {
  letter: "M",
  pron: "emm"
}, {
  letter: "N",
  pron: "enn"
}, {
  letter: "O",
  pron: "oh"
}, {
  letter: "P",
  pron: "pe"
}, {
  letter: "Q",
  pron: "ku"
}, {
  letter: "R",
  pron: "err"
}, {
  letter: "S",
  pron: "ess"
}, {
  letter: "T",
  pron: "te"
}, {
  letter: "U",
  pron: "uh"
}, {
  letter: "V",
  pron: "vau"
}, {
  letter: "W",
  pron: "we"
}, {
  letter: "X",
  pron: "ix"
}, {
  letter: "Y",
  pron: "ypsilon"
}, {
  letter: "Z",
  pron: "zett"
}, {
  letter: "Ä",
  pron: "äh"
}, {
  letter: "Ö",
  pron: "öh"
}, {
  letter: "Ü",
  pron: "üh"
}, {
  letter: "ß",
  pron: "eszett"
}];
const palette = ["bg-rose-300", "bg-amber-300", "bg-emerald-300", "bg-sky-300", "bg-violet-300", "bg-pink-300", "bg-lime-300"];
function AlphabetPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-2xl space-y-6 pb-10 mt-14", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-black mb-6", children: "Alphabet" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 pb-10", children: alphabetDetails.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => speakDE(item.pron), className: `${palette[i % palette.length]} flex items-center justify-center aspect-square rounded-3xl p-2 shadow-md hover:shadow-lg ring-4 ring-white transition-all hover:scale-105 active:scale-95 cursor-pointer group`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl sm:text-5xl font-black text-foreground group-hover:animate-bounce select-none", children: item.letter }) }, item.letter)) })
  ] });
}
export {
  AlphabetPage as component
};
