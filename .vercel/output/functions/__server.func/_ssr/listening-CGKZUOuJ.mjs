import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
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
const alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "Ä",
  "Ö",
  "Ü",
  "ß"
];
function pickRound() {
  const pool = [...alphabet].sort(() => Math.random() - 0.5);
  const options = pool.slice(0, 4);
  const answer = options[Math.floor(Math.random() * options.length)];
  return {
    options,
    answer
  };
}
function ListeningPage() {
  const [round, setRound] = reactExports.useState(() => pickRound());
  const [feedback, setFeedback] = reactExports.useState(null);
  const [score, setScore] = reactExports.useState({
    ok: 0,
    no: 0
  });
  reactExports.useEffect(() => {
    const t = setTimeout(() => speakDE(round.answer), 300);
    return () => clearTimeout(t);
  }, [round]);
  function choose(letter) {
    if (letter === round.answer) {
      setFeedback("correct");
      setScore((s) => ({
        ...s,
        ok: s.ok + 1
      }));
      setTimeout(() => {
        setFeedback(null);
        setRound(pickRound());
      }, 900);
    } else {
      setFeedback("wrong");
      setScore((s) => ({
        ...s,
        no: s.no + 1
      }));
      setTimeout(() => setFeedback(null), 700);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-2xl space-y-6 pb-10 mt-14", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-black mb-6", children: "Hör-Übung" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-2xl bg-white/70 px-4 py-2 text-lg font-bold", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        "✅ ",
        score.ok
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        "❌ ",
        score.no
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-col items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => speakDE(round.answer), className: "flex h-32 w-32 items-center justify-center rounded-full bg-primary text-6xl text-primary-foreground shadow-xl ring-8 ring-white transition active:scale-95", "aria-label": "Buchstabe nochmal hören", children: "🔊" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-semibold text-foreground/60", children: "Welcher Buchstabe?" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mt-6 grid max-w-md grid-cols-2 gap-4", children: round.options.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => choose(l), className: "aspect-square rounded-3xl bg-sky-300 text-6xl font-black text-foreground shadow-md ring-4 ring-white transition active:scale-90", children: l }, l)) }),
    feedback && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-40 flex items-center justify-center bg-black/20 pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10rem] animate-bounce", children: feedback === "correct" ? "😊" : "😢" }) })
  ] });
}
export {
  ListeningPage as component
};
