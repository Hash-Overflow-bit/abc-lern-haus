import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { S as notFound } from "../_libs/tanstack__router-core.mjs";
import { l as lessons } from "./lessons-C9xw10UW.mjs";
import { R as Route, s as speakDE } from "./router-FKn1rZPS.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
const letterProns = {
  A: "ah",
  B: "be",
  C: "ce",
  D: "de",
  E: "eh",
  F: "eff",
  G: "ge",
  H: "ha",
  I: "ih",
  J: "jot",
  K: "ka",
  L: "ell",
  M: "emm",
  N: "enn",
  O: "oh",
  P: "pe",
  Q: "ku",
  R: "err",
  S: "ess",
  T: "te",
  U: "uh",
  V: "vau",
  W: "we",
  X: "ix",
  Y: "ypsilon",
  Z: "zett",
  "Ä": "äh",
  "Ö": "öh",
  "Ü": "üh",
  "ß": "eszett",
  ss: "ss"
};
const alphabetRows = [{
  id: "row1",
  label: "A bis G",
  letters: ["A", "B", "C", "D", "E", "F", "G"]
}, {
  id: "row2",
  label: "H bis P",
  letters: ["H", "I", "J", "K", "L", "M", "N", "O", "P"]
}, {
  id: "row3",
  label: "Q bis W",
  letters: ["Q", "R", "S", "T", "U", "V", "W"]
}, {
  id: "row4",
  label: "X bis Z",
  letters: ["X", "Y", "Z"]
}];
const sonderRow = ["Ä", "Ö", "Ü", "ß", "ss"];
const abcMitWieRows = [{
  letter: "A",
  word: "Apfel"
}, {
  letter: "B",
  word: "Buch"
}, {
  letter: "C",
  word: "Computer"
}, {
  letter: "D",
  word: "Deutsch"
}, {
  letter: "E",
  word: "England"
}, {
  letter: "F",
  word: "Fisch"
}, {
  letter: "G",
  word: "Gold"
}, {
  letter: "H",
  word: "Hotel"
}, {
  letter: "I",
  word: "Italien"
}, {
  letter: "J",
  word: "Japan"
}, {
  letter: "K",
  word: "Kanada"
}, {
  letter: "L",
  word: "London"
}, {
  letter: "M",
  word: "Mama"
}, {
  letter: "N",
  word: "November"
}, {
  letter: "O",
  word: "Orange"
}, {
  letter: "P",
  word: "Papa"
}, {
  letter: "Q",
  word: "Quiz"
}, {
  letter: "R",
  word: "Rot"
}, {
  letter: "S",
  word: "Schweiz"
}, {
  letter: "T",
  word: "Telefon"
}, {
  letter: "U",
  word: "Uhr"
}, {
  letter: "V",
  word: "Vater"
}, {
  letter: "W",
  word: "Wohnung"
}, {
  letter: "X",
  word: "Xylofon"
}, {
  letter: "Y",
  word: "Yoga"
}, {
  letter: "Z",
  word: "Zimmer"
}, {
  letter: "Ä",
  word: "Äpfel"
}, {
  letter: "Ö",
  word: "Öl"
}, {
  letter: "Ü",
  word: "Übersetzen"
}];
const palette = ["bg-white border-foreground/15 hover:bg-foreground/5 text-foreground"];
const lautpaarColors = {
  "E/I": {
    bg: "bg-white",
    ring: "ring-foreground/10 border-2 border-foreground/15",
    badge: "bg-foreground",
    text: "text-foreground",
    highlight: "text-foreground underline font-black"
  },
  "Ö/O": {
    bg: "bg-white",
    ring: "ring-foreground/10 border-2 border-foreground/15",
    badge: "bg-foreground",
    text: "text-foreground",
    highlight: "text-foreground underline font-black"
  },
  "Ü/U": {
    bg: "bg-white",
    ring: "ring-foreground/10 border-2 border-foreground/15",
    badge: "bg-foreground",
    text: "text-foreground",
    highlight: "text-foreground underline font-black"
  },
  "P/B": {
    bg: "bg-white",
    ring: "ring-foreground/10 border-2 border-foreground/15",
    badge: "bg-foreground",
    text: "text-foreground",
    highlight: "text-foreground underline font-black"
  },
  "T/D": {
    bg: "bg-white",
    ring: "ring-foreground/10 border-2 border-foreground/15",
    badge: "bg-foreground",
    text: "text-foreground",
    highlight: "text-foreground underline font-black"
  },
  "G/K": {
    bg: "bg-white",
    ring: "ring-foreground/10 border-2 border-foreground/15",
    badge: "bg-foreground",
    text: "text-foreground",
    highlight: "text-foreground underline font-black"
  }
};
const catInfo = {
  "Zahlen 11-20": {
    emoji: "",
    bg: "bg-white",
    ring: "ring-foreground/10 border-2 border-foreground/15",
    badge: "bg-foreground",
    text: "text-foreground"
  },
  "Telefonnummer": {
    emoji: "",
    bg: "bg-white",
    ring: "ring-foreground/10 border-2 border-foreground/15",
    badge: "bg-foreground",
    text: "text-foreground"
  },
  "Preise": {
    emoji: "",
    bg: "bg-white",
    ring: "ring-foreground/10 border-2 border-foreground/15",
    badge: "bg-foreground",
    text: "text-foreground"
  },
  "Datum": {
    emoji: "",
    bg: "bg-white",
    ring: "ring-foreground/10 border-2 border-foreground/15",
    badge: "bg-foreground",
    text: "text-foreground"
  },
  "Reihenfolge": {
    emoji: "",
    bg: "bg-white",
    ring: "ring-foreground/10 border-2 border-foreground/15",
    badge: "bg-foreground",
    text: "text-foreground"
  }
};
function LessonPage() {
  const {
    lessonId
  } = Route.useParams();
  const [mode, setMode] = reactExports.useState("learn");
  const [picked, setPicked] = reactExports.useState(null);
  const [userAnswers, setUserAnswers] = reactExports.useState({});
  reactExports.useEffect(() => {
    setMode("learn");
    setPicked(null);
    setUserAnswers({});
  }, [lessonId]);
  function speakLessonItem(text) {
    if (lessonId === "1") {
      speakDE(text);
    }
  }
  const lesson = lessons.find((l) => l.id === lessonId);
  if (!lesson) throw notFound();
  const ex = lesson.exercise;
  const isCorrect = picked === ex.answer;
  function choose(opt) {
    setPicked(opt);
    if (opt === ex.answer) {
      speakDE("Super!");
    } else {
      speakDE("Nochmal!");
    }
  }
  function checkAnswer(letter, val) {
    if (!val) return false;
    const cleanVal = val.replace(/\s+/g, "").trim();
    const cleanValLower = cleanVal.toLowerCase();
    const letterLower = letter.toLowerCase();
    letterProns[letter]?.toLowerCase() || "";
    if (lessonId === "2") {
      if (letter === "ß" || letter === "ss") {
        return cleanValLower === letter.toLowerCase();
      }
      if (letter === "Ä") return cleanVal === "Ää" || cleanValLower === "ää";
      if (letter === "Ö") return cleanVal === "Öö" || cleanValLower === "öö";
      if (letter === "Ü") return cleanVal === "Üü" || cleanValLower === "üü";
      const expected = letter + letter.toLowerCase();
      return cleanVal === expected;
    }
    return cleanValLower === letterLower || cleanValLower === letterLower + letterLower;
  }
  function handleInputChange(letter, val) {
    const wasCorrect = checkAnswer(letter, userAnswers[letter] || "");
    const isCorrectNow = checkAnswer(letter, val);
    setUserAnswers((prev) => ({
      ...prev,
      [letter]: val
    }));
    if (isCorrectNow && !wasCorrect) {
      speakDE("Super!");
    }
  }
  const allLetters = [...alphabetRows.flatMap((r) => r.letters), ...sonderRow];
  const isABCComplete = allLetters.every((l) => checkAnswer(l, userAnswers[l] || ""));
  function checkWieAnswer(word, val) {
    if (!val) return false;
    return val.trim().toLowerCase() === word.toLowerCase();
  }
  function handleWieInput(letter, val) {
    const row = abcMitWieRows.find((r) => r.letter === letter);
    const wasCorrect = row ? checkWieAnswer(row.word, userAnswers[`wie_${letter}`] || "") : false;
    const isNowCorrect = row ? checkWieAnswer(row.word, val) : false;
    setUserAnswers((prev) => ({
      ...prev,
      [`wie_${letter}`]: val
    }));
    if (isNowCorrect && !wasCorrect) speakDE("Super!");
  }
  const isWieComplete = abcMitWieRows.every((r) => checkWieAnswer(r.word, userAnswers[`wie_${r.letter}`] || ""));
  const vokalGroups = lesson.vokale;
  function checkVokalAnswer(word, val) {
    if (!val) return false;
    return val.trim().toLowerCase() === word.toLowerCase();
  }
  function handleVokalInput(word, val) {
    const wasCorrect = checkVokalAnswer(word, userAnswers[`v_${word}`] || "");
    const isNowCorrect = checkVokalAnswer(word, val);
    setUserAnswers((prev) => ({
      ...prev,
      [`v_${word}`]: val
    }));
    if (isNowCorrect && !wasCorrect) speakDE("Super!");
  }
  const isVokaleComplete = vokalGroups ? vokalGroups.every((g) => g.words.every((w) => checkVokalAnswer(w, userAnswers[`v_${w}`] || ""))) : false;
  const lautkomGroups = lesson.lautkom;
  function checkLautAnswer(word, val) {
    if (!val) return false;
    return val.trim().toLowerCase() === word.toLowerCase();
  }
  function handleLautInput(word, val) {
    const wasCorrect = checkLautAnswer(word, userAnswers[`l_${word}`] || "");
    const isNowCorrect = checkLautAnswer(word, val);
    setUserAnswers((prev) => ({
      ...prev,
      [`l_${word}`]: val
    }));
    if (isNowCorrect && !wasCorrect) speakDE("Super!");
  }
  const isLautComplete = lautkomGroups ? lautkomGroups.every((g) => g.words.every((w) => checkLautAnswer(w, userAnswers[`l_${w}`] || ""))) : false;
  const lautpaarGroups = lesson.lautpaare;
  function checkLautpaarAnswer(word, val) {
    if (!val) return false;
    return val.trim().toLowerCase() === word.toLowerCase();
  }
  function handleLautpaarInput(pair, word, idx, val) {
    const key = `p_${pair}_${word}_${idx}`;
    const wasCorrect = checkLautpaarAnswer(word, userAnswers[key] || "");
    const isNowCorrect = checkLautpaarAnswer(word, val);
    setUserAnswers((prev) => ({
      ...prev,
      [key]: val
    }));
    if (isNowCorrect && !wasCorrect) speakDE("Super!");
  }
  const isLautpaarComplete = lautpaarGroups ? lautpaarGroups.every((g) => {
    const allWords = [];
    const maxLen = Math.max(g.words1.length, g.words2.length);
    for (let i = 0; i < maxLen; i++) {
      if (i < g.words1.length) allWords.push(g.words1[i]);
      if (i < g.words2.length) allWords.push(g.words2[i]);
    }
    return allWords.every((w, idx) => checkLautpaarAnswer(w, userAnswers[`p_${g.pair}_${w}_${idx}`] || ""));
  }) : false;
  function highlightPair(word, label) {
    const chars = label.split("/").map((c) => c.trim().toLowerCase());
    const lower = word.toLowerCase();
    let bestIdx = -1;
    let matchLen = 1;
    for (const char of chars) {
      const idx = lower.indexOf(char);
      if (idx !== -1 && (bestIdx === -1 || idx < bestIdx)) {
        bestIdx = idx;
        matchLen = char.length;
      }
    }
    if (bestIdx === -1) return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: word });
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
      word.slice(0, bestIdx),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "underline decoration-2 font-black", style: {
        color: "inherit"
      }, children: word.slice(bestIdx, bestIdx + matchLen) }),
      word.slice(bestIdx + matchLen)
    ] });
  }
  const numberGroups = lesson.numbers;
  function checkNumberAnswer(word, val) {
    if (!val) return false;
    return val.trim().toLowerCase() === word.toLowerCase();
  }
  function handleNumberInput(word, val) {
    const wasCorrect = checkNumberAnswer(word, userAnswers[`num_${word}`] || "");
    const isNowCorrect = checkNumberAnswer(word, val);
    setUserAnswers((prev) => ({
      ...prev,
      [`num_${word}`]: val
    }));
    if (isNowCorrect && !wasCorrect) speakDE("Super!");
  }
  const isNumbersComplete = numberGroups ? numberGroups.every((g) => checkNumberAnswer(g.word, userAnswers[`num_${g.word}`] || "")) : false;
  const numberAnwGroups = lesson.numbers_anw;
  function checkNumberAnwAnswer(word, val) {
    if (!val) return false;
    return val.trim().toLowerCase() === word.toLowerCase();
  }
  function handleNumberAnwInput(word, idx, val) {
    const key = `numanw_${word}_${idx}`;
    const wasCorrect = checkNumberAnwAnswer(word, userAnswers[key] || "");
    const isNowCorrect = checkNumberAnwAnswer(word, val);
    setUserAnswers((prev) => ({
      ...prev,
      [key]: val
    }));
    if (isNowCorrect && !wasCorrect) speakDE("Super!");
  }
  const isNumbersAnwComplete = numberAnwGroups ? numberAnwGroups.every((g, idx) => checkNumberAnwAnswer(g.word, userAnswers[`numanw_${g.word}_${idx}`] || "")) : false;
  const zeitGroups = lesson.zeit;
  const zeitExercises = lesson.exercises;
  function checkZeitAnswer(word, val) {
    if (!val) return false;
    return val.trim().toLowerCase().replace(/\s+/g, " ") === word.toLowerCase().replace(/\s+/g, " ");
  }
  function handleZeitInput(word, idx, val) {
    const key = `zeit_${word}_${idx}`;
    const wasCorrect = checkZeitAnswer(word, userAnswers[key] || "");
    const isNowCorrect = checkZeitAnswer(word, val);
    setUserAnswers((prev) => ({
      ...prev,
      [key]: val
    }));
    if (isNowCorrect && !wasCorrect) speakDE("Super!");
  }
  const isZeitComplete = zeitExercises ? zeitExercises.every((g, idx) => checkZeitAnswer(g.word, userAnswers[`zeit_${g.word}_${idx}`] || "")) : false;
  const reviewGroups = lesson.wiederholung;
  function checkReviewAnswer(answer, val) {
    if (!answer) return true;
    if (!val) return false;
    return val.trim().toLowerCase() === answer.toLowerCase();
  }
  function handleReviewInput(answer, catIdx, itemIdx, val) {
    const key = `rev_${catIdx}_${itemIdx}`;
    const wasCorrect = checkReviewAnswer(answer, userAnswers[key] || "");
    const isNowCorrect = checkReviewAnswer(answer, val);
    setUserAnswers((prev) => ({
      ...prev,
      [key]: val
    }));
    if (isNowCorrect && !wasCorrect) speakDE("Super!");
  }
  const isReviewComplete = reviewGroups ? reviewGroups.every((g, catIdx) => g.items.every((it, itemIdx) => checkReviewAnswer(it.answer, userAnswers[`rev_${catIdx}_${itemIdx}`] || ""))) : false;
  function highlightCombo(word, combo) {
    const lower = word.toLowerCase();
    const comboLower = combo.toLowerCase();
    const idx = lower.indexOf(comboLower);
    if (idx === -1) return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: word });
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
      word.slice(0, idx),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "underline decoration-2 font-black", style: {
        color: "inherit"
      }, children: word.slice(idx, idx + combo.length) }),
      word.slice(idx + combo.length)
    ] });
  }
  function getLetterDisplay(l) {
    if (lessonId === "2") {
      if (l === "ß" || l === "ss") return l;
      if (l === "Ä") return "Ä ä";
      if (l === "Ö") return "Ö ö";
      if (l === "Ü") return "Ü ü";
      return `${l} ${l.toLowerCase()}`;
    }
    return l;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-2xl space-y-6 pb-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/lessons", className: "self-start inline-flex items-center gap-1 rounded-full bg-white/80 px-4 py-1.5 text-sm font-black text-foreground/70 shadow hover:bg-white transition active:scale-95", children: "← Alle Lektionen" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-xs sm:text-sm font-black select-none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setMode("learn"), className: `flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${mode === "learn" ? "bg-amber-300 text-foreground shadow-md scale-105 ring-2 ring-white" : "bg-white/40 text-foreground/50 hover:bg-white/60"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "1. Lernen" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 w-4 sm:w-6 rounded bg-foreground/20" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setMode("exercise"), className: `flex items-center gap-1.5 px-4 py-2 rounded-full transition-all ${mode === "exercise" ? "bg-primary text-primary-foreground shadow-md scale-105 ring-2 ring-white" : "bg-white/40 text-foreground/50 hover:bg-white/60"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" }) }) })
      ] })
    ] }),
    lessonId === "3" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      mode === "learn" && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-3xl bg-white/80 p-5 sm:p-8 shadow-lg ring-4 ring-white animate-fade-in space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-black text-foreground", children: "Abc mit WIE" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-muted-foreground", children: "Ein Wort für jeden Buchstaben!" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl overflow-hidden border-2 border-foreground/15 shadow-md", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/abc_mit_wie_chart.png", alt: "ABC mit WIE – Übersicht aller Buchstaben mit deutschen Wörtern", className: "w-full h-auto object-contain" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-black text-foreground/60 uppercase tracking-wider px-1 flex items-center gap-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Sonderbuchstaben mit WIE" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl overflow-hidden border-2 border-foreground/15 shadow-md bg-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/umlaute_wie_cards.png", alt: "Ä wie Äpfel, Ö wie Öl, Ü wie Übersetzen", className: "w-full h-auto object-contain" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-bold text-foreground/60 uppercase tracking-wider", children: "Wörter:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-2", children: abcMitWieRows.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `${palette[0]} flex items-center gap-2 rounded-2xl border-2 px-3 py-2 shadow-sm text-left`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-black w-8 shrink-0", children: row.letter }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold opacity-60", children: "wie" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-black", children: row.word })
          ] }, row.letter)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setMode("exercise"), className: "w-full mt-6 py-5 px-6 rounded-3xl bg-gradient-to-r from-primary to-orange-400 text-white font-black text-xl sm:text-2xl shadow-xl hover:shadow-2xl ring-4 ring-white transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 select-none cursor-pointer group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-8 w-8", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl transition-transform group-hover:translate-x-1", children: "➤" })
        ] })
      ] }),
      mode === "exercise" && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-3xl bg-white/80 p-5 sm:p-8 shadow-lg ring-4 ring-white animate-fade-in space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-black text-foreground", children: "Schreibübung" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-muted-foreground", children: "Fülle die leeren Felder aus!" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setMode("learn"), className: "text-xs font-black text-primary hover:underline", children: "Wörter lernen" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full border-collapse", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-foreground/5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-sm font-black text-foreground/70 rounded-tl-2xl w-16", children: "Abc" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-sm font-black text-foreground/70 w-16", children: "wie" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-sm font-black text-foreground/70 rounded-tr-2xl", children: "Deutsch" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: abcMitWieRows.map((row, idx) => {
            const key = `wie_${row.letter}`;
            const val = userAnswers[key] || "";
            const correct = checkWieAnswer(row.word, val);
            const hasVal = val.length > 0;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: `border-b border-foreground/5 transition-colors ${correct ? "bg-emerald-50" : idx % 2 === 0 ? "bg-white/60" : "bg-white/30"}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-black text-foreground select-none", children: row.letter }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-foreground/40", children: "wie" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2", children: correct ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 text-base font-black text-emerald-700", children: [
                row.word,
                " ✅"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: val, onChange: (e) => handleWieInput(row.letter, e.target.value), placeholder: "?", maxLength: 20, className: `w-full max-w-[200px] px-3 py-1.5 rounded-xl border-2 text-sm font-black transition-all outline-none ${hasVal ? "bg-rose-100 border-rose-400 text-rose-800 animate-shake" : "bg-white border-dashed border-sky-300 focus:border-sky-50/50"}` }) })
            ] }, row.letter);
          }) })
        ] }) }),
        isWieComplete && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 text-center animate-bounce bg-emerald-50 border border-emerald-100 rounded-3xl p-5 shadow-inner", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-6xl", children: "🎉😊🎉" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-xl font-black text-emerald-700", children: "Großartig! Du hast alle Wörter geschrieben!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(NextLessonButton, { currentId: lesson.id })
        ] })
      ] })
    ] }) : lessonId === "4" && vokalGroups ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      mode === "learn" && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-3xl bg-white/80 p-5 sm:p-8 shadow-lg ring-4 ring-white animate-fade-in space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-black text-foreground", children: "Vokale" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-muted-foreground", children: "Die Vokale im Deutschen" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3 justify-center flex-wrap", children: vokalGroups.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-foreground/10 text-foreground w-14 h-14 rounded-full text-3xl font-black shadow-lg flex items-center justify-center select-none", children: g.vowel }, g.vowel)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-5", children: vokalGroups.map((g) => {
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/50 rounded-2xl p-4 border border-foreground/10 space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-foreground/10 text-foreground w-10 h-10 rounded-xl text-xl font-black flex items-center justify-center shadow select-none", children: g.vowel }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-lg font-black text-foreground", children: [
                g.vowel,
                " – Deutsch"
              ] }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-2", children: g.words.map((w) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-xl px-3 py-2 text-sm font-black text-foreground shadow-sm border border-foreground/10 text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: w }) }, w)) })
          ] }, g.vowel);
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setMode("exercise"), className: "w-full mt-6 py-5 px-6 rounded-3xl bg-foreground text-white font-black text-xl sm:text-2xl shadow-xl hover:shadow-2xl ring-4 ring-white transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 select-none cursor-pointer group", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-8 w-8", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" }) }) })
      ] }),
      mode === "exercise" && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-3xl bg-white/80 p-5 sm:p-8 shadow-lg ring-4 ring-white animate-fade-in space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-black text-foreground", children: "Schreibübung" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-muted-foreground", children: "Fülle die leeren Felder aus!" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setMode("learn"), className: "text-xs font-black text-primary hover:underline", children: "Vokale lernen" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: vokalGroups.map((g) => {
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-2xl border border-foreground/10 shadow-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-foreground/5 px-4 py-2 flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground text-2xl font-black", children: g.vowel }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground/60 text-sm font-bold", children: [
                "Vokale – ",
                g.vowel
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 bg-foreground/5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-2 text-xs font-black text-foreground/60 uppercase tracking-wider border-r border-foreground/10", children: "Deutsch" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-2 text-xs font-black text-foreground/60 uppercase tracking-wider", children: "Schreibe hier" })
            ] }),
            g.words.map((w, idx) => {
              const val = userAnswers[`v_${w}`] || "";
              const correct = checkVokalAnswer(w, val);
              const hasVal = val.length > 0;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `grid grid-cols-2 border-t border-foreground/5 transition-colors ${correct ? "bg-emerald-50" : idx % 2 === 0 ? "bg-white" : "bg-white/50"}`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-2.5 border-r border-foreground/10 flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-black text-foreground select-none", children: w }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-2 flex items-center", children: correct ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-black text-emerald-700 flex items-center gap-1", children: w }) : /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: val, onChange: (e) => handleVokalInput(w, e.target.value), placeholder: "?", maxLength: 25, className: `w-full px-3 py-1.5 rounded-xl border-2 text-sm font-black transition-all outline-none ${hasVal ? "bg-rose-100 border-rose-400 text-rose-800 animate-shake" : "bg-white border-dashed border-sky-300 focus:border-sky-50/50"}` }) })
              ] }, w);
            })
          ] }, g.vowel);
        }) }),
        isVokaleComplete && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 text-center bg-emerald-50 border border-emerald-100 rounded-3xl p-5 shadow-inner", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-xl font-black text-emerald-700", children: "Großartig! Du hast alle Vokale geschrieben!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(NextLessonButton, { currentId: lesson.id })
        ] })
      ] })
    ] }) : lessonId === "6" && lautpaarGroups ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      mode === "learn" && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-3xl bg-white/80 p-5 sm:p-8 shadow-lg ring-4 ring-white animate-fade-in space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-black text-foreground", children: "Ähnliche Lautpaare" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-muted-foreground", children: "Lerne ähnliche Lautpaare im Deutschen kennen" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap justify-center", children: lautpaarGroups.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-foreground text-white px-5 py-2 rounded-full text-lg font-black shadow-md select-none", children: g.label }, g.pair)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: lautpaarGroups.map((g) => {
          const c = lautpaarColors[g.pair] || {
            bg: "bg-white"
          };
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `${c.bg} rounded-2xl p-4 sm:p-5 border border-foreground/10 space-y-4`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 border-b border-foreground/5 pb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-foreground text-white px-3 py-1 rounded-lg text-lg font-black shadow select-none", children: g.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base font-black text-foreground", children: "Vergleiche Deutsch 1 und Deutsch 2" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 sm:gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-black opacity-60 tracking-wider uppercase pl-2", children: "Deutsch 1" }),
                g.words1.map((w) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-white rounded-xl px-3 py-2 text-sm font-bold text-foreground shadow-sm border border-foreground/10 text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: highlightPair(w, g.label) }) }, w))
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-black opacity-60 tracking-wider uppercase pl-2", children: "Deutsch 2" }),
                g.words2.map((w) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-white rounded-xl px-3 py-2 text-sm font-bold text-foreground shadow-sm border border-foreground/10 text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: highlightPair(w, g.label) }) }, w))
              ] })
            ] })
          ] }, g.pair);
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setMode("exercise"), className: "w-full mt-6 py-5 px-6 rounded-3xl bg-gradient-to-r from-primary to-orange-400 text-white font-black text-xl sm:text-2xl shadow-xl hover:shadow-2xl ring-4 ring-white transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 select-none cursor-pointer group", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-8 w-8", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" }) }) })
      ] }),
      mode === "exercise" && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-3xl bg-white/80 p-5 sm:p-8 shadow-lg ring-4 ring-white animate-fade-in space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-black text-foreground", children: "Schreibübung" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-muted-foreground", children: "Fülle die leeren Felder aus!" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setMode("learn"), className: "text-xs font-black text-primary hover:underline", children: "Lautpaare lernen" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: lautpaarGroups.map((g) => {
          lautpaarColors[g.pair] || {};
          const allWords = [];
          const maxLen = Math.max(g.words1.length, g.words2.length);
          for (let i = 0; i < maxLen; i++) {
            if (i < g.words1.length) allWords.push(g.words1[i]);
            if (i < g.words2.length) allWords.push(g.words2[i]);
          }
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-2xl border border-foreground/10 shadow-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-foreground/5 px-4 py-2.5 flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground text-xl font-black tracking-widest", children: g.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground/60 text-sm font-bold", children: [
                "Ähnliche Lautpaare – ",
                g.label
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 bg-foreground/5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-2 text-xs font-black text-foreground/60 uppercase tracking-wider border-r border-foreground/10", children: "Deutsch" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-2 text-xs font-black text-foreground/60 uppercase tracking-wider", children: "Schreibe hier" })
            ] }),
            allWords.map((w, idx) => {
              const key = `p_${g.pair}_${w}_${idx}`;
              const val = userAnswers[key] || "";
              const correct = checkLautpaarAnswer(w, val);
              const hasVal = val.length > 0;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `grid grid-cols-2 border-t border-foreground/5 transition-colors ${correct ? "bg-emerald-50" : idx % 2 === 0 ? "bg-white" : "bg-white/50"}`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-2.5 border-r border-foreground/10 flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-black text-foreground select-none", children: highlightPair(w, g.label) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-2 flex items-center", children: correct ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-black text-emerald-700 flex items-center gap-1", children: [
                  w,
                  " ✅"
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: val, onChange: (e) => handleLautpaarInput(g.pair, w, idx, e.target.value), placeholder: "?", maxLength: 30, className: `w-full px-3 py-1.5 rounded-xl border-2 text-sm font-black transition-all outline-none ${hasVal ? "bg-rose-100 border-rose-400 text-rose-800 animate-shake" : "bg-white border-dashed border-sky-300 focus:border-sky-50/50"}` }) })
              ] }, `${w}-${idx}`);
            })
          ] }, g.pair);
        }) }),
        isLautpaarComplete && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 text-center animate-bounce bg-emerald-50 border border-emerald-100 rounded-3xl p-5 shadow-inner", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-xl font-black text-emerald-700", children: "Großartig! Du hast alle Wörter geschrieben!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(NextLessonButton, { currentId: lesson.id })
        ] })
      ] })
    ] }) : lessonId === "7" && numberGroups ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      mode === "learn" && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-3xl bg-white/80 p-5 sm:p-8 shadow-lg ring-4 ring-white animate-fade-in space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-black text-foreground", children: "Zahlen 0–10" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-muted-foreground", children: "Lerne die Zahlen von null bis zehn" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-3", children: numberGroups.map((num, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center p-5 rounded-3xl border-2 border-foreground/10 bg-white shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-5xl font-black select-none", children: num.n }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base font-black mt-2", children: num.word })
        ] }, num.n)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setMode("exercise"), className: "w-full mt-6 py-5 px-6 rounded-3xl bg-gradient-to-r from-primary to-orange-400 text-white font-black text-xl sm:text-2xl shadow-xl hover:shadow-2xl ring-4 ring-white transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 select-none cursor-pointer group", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-8 w-8", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" }) }) })
      ] }),
      mode === "exercise" && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-3xl bg-white/80 p-5 sm:p-8 shadow-lg ring-4 ring-white animate-fade-in space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-black text-foreground", children: "Schreibübung" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-muted-foreground", children: "Fülle die leeren Felder aus!" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setMode("learn"), className: "text-xs font-black text-primary hover:underline", children: "Zahlen lernen" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-2xl border border-foreground/10 shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 bg-foreground/5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-2 text-xs font-black text-foreground/60 uppercase tracking-wider border-r border-foreground/10", children: "Zahl" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-2 text-xs font-black text-foreground/60 uppercase tracking-wider", children: "Schreibe hier" })
          ] }),
          numberGroups.map((num, idx) => {
            const val = userAnswers[`num_${num.word}`] || "";
            const correct = checkNumberAnswer(num.word, val);
            const hasVal = val.length > 0;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `grid grid-cols-2 border-t border-foreground/5 transition-colors ${correct ? "bg-emerald-50" : idx % 2 === 0 ? "bg-white" : "bg-white/50"}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-2.5 border-r border-foreground/10 flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-black text-foreground select-none", children: num.n }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-2 flex items-center", children: correct ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-black text-emerald-700 flex items-center gap-1", children: [
                num.word,
                " ✅"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: val, onChange: (e) => handleNumberInput(num.word, e.target.value), placeholder: "?", maxLength: 20, className: `w-full px-3 py-1.5 rounded-xl border-2 text-sm font-black transition-all outline-none ${hasVal ? "bg-rose-100 border-rose-400 text-rose-800 animate-shake" : "bg-white border-dashed border-sky-300 focus:border-sky-50/50"}` }) })
            ] }, num.n);
          })
        ] }),
        isNumbersComplete && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 text-center bg-emerald-50 border border-emerald-100 rounded-3xl p-5 shadow-inner", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-xl font-black text-emerald-700", children: "Großartig! Du hast alle Zahlen richtig geschrieben!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(NextLessonButton, { currentId: lesson.id })
        ] })
      ] })
    ] }) : lessonId === "8" && numberAnwGroups ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      mode === "learn" && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-3xl bg-white/80 p-5 sm:p-8 shadow-lg ring-4 ring-white animate-fade-in space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-black text-foreground", children: "Zahlen 11–20 & Anwendungen" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-muted-foreground", children: "Lerne Zahlen und ihre Verwendung im Alltag kennen" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: Array.from(new Set(numberAnwGroups.map((g) => g.category))).map((cat) => {
          const info = catInfo[cat] || {
            bg: "bg-white"
          };
          const items = numberAnwGroups.filter((g) => g.category === cat);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `${info.bg} rounded-2xl p-4 sm:p-5 border border-foreground/10 space-y-4`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3 border-b border-foreground/5 pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-black text-foreground", children: cat }) }),
            cat === "Zahlen 11-20" ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-2", children: items.map((it) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl px-3 py-2 text-sm font-bold text-foreground shadow-sm border border-foreground/10 flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-black text-base", children: it.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-80 font-bold", children: it.word })
            ] }, it.label)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2", children: items.map((it) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-xl px-4 py-3 text-sm font-bold text-foreground shadow-sm border border-foreground/10 flex items-center justify-between gap-3 text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-black opacity-55 mr-2", children: [
                it.label,
                ":"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-black text-base", children: it.word })
            ] }) }, it.word)) })
          ] }, cat);
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setMode("exercise"), className: "w-full mt-6 py-5 px-6 rounded-3xl bg-gradient-to-r from-primary to-orange-400 text-white font-black text-xl sm:text-2xl shadow-xl hover:shadow-2xl ring-4 ring-white transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 select-none cursor-pointer group", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-8 w-8", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" }) }) })
      ] }),
      mode === "exercise" && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-3xl bg-white/80 p-5 sm:p-8 shadow-lg ring-4 ring-white animate-fade-in space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-black text-foreground", children: "Schreibübung" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-muted-foreground", children: "Fülle die leeren Felder aus!" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setMode("learn"), className: "text-xs font-black text-primary hover:underline", children: "Zahlen lernen" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: Array.from(new Set(numberAnwGroups.map((g) => g.category))).map((cat) => {
          const items = numberAnwGroups.filter((g) => g.category === cat);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-2xl border border-foreground/10 shadow-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-foreground/5 px-4 py-2.5 flex items-center gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground text-sm font-bold", children: cat }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 bg-foreground/5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-2 text-xs font-black text-foreground/60 uppercase tracking-wider border-r border-foreground/10", children: "Deutsch" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-2 text-xs font-black text-foreground/60 uppercase tracking-wider", children: "Schreibe hier" })
            ] }),
            items.map((it) => {
              const globalIdx = numberAnwGroups.indexOf(it);
              const key = `numanw_${it.word}_${globalIdx}`;
              const val = userAnswers[key] || "";
              const correct = checkNumberAnwAnswer(it.word, val);
              const hasVal = val.length > 0;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `grid grid-cols-2 border-t border-foreground/5 transition-colors ${correct ? "bg-emerald-50" : globalIdx % 2 === 0 ? "bg-white" : "bg-white/50"}`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-2.5 border-r border-foreground/10 flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-black text-foreground select-none text-left", children: it.label }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-2 flex items-center", children: correct ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-black text-emerald-700 flex items-center gap-1", children: [
                  it.word,
                  " ✅"
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: val, onChange: (e) => handleNumberAnwInput(it.word, globalIdx, e.target.value), placeholder: "?", maxLength: 30, className: `w-full px-3 py-1.5 rounded-xl border-2 text-sm font-black transition-all outline-none ${hasVal ? "bg-rose-100 border-rose-400 text-rose-800 animate-shake" : "bg-white border-dashed border-sky-300 focus:border-sky-50/50"}` }) })
              ] }, `${it.word}-${globalIdx}`);
            })
          ] }, cat);
        }) }),
        isNumbersAnwComplete && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 text-center animate-bounce bg-emerald-50 border border-emerald-100 rounded-3xl p-5 shadow-inner", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-6xl", children: "🎉😊🎉" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-xl font-black text-emerald-700", children: "Großartig! Du hast alle Zahlen und Anwendungen richtig geschrieben!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(NextLessonButton, { currentId: lesson.id })
        ] })
      ] })
    ] }) : lessonId === "9" && zeitGroups && zeitExercises ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      mode === "learn" && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-3xl bg-white p-5 sm:p-8 border-2 border-black animate-fade-in space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-black text-black", children: "Zeit" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-black/60", children: "Uhrzeit und Begriffe" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: zeitGroups.map((g) => {
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl p-4 sm:p-5 border-2 border-black space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3 border-b-2 border-black pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-black text-black", children: g.category }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2", children: g.items.map((it) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl px-4 py-3 text-sm font-black text-black border-2 border-black flex items-center justify-between gap-3 text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              it.label !== "Frage" && it.label !== it.word && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-black opacity-55 mr-2", children: [
                it.label,
                ":"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-black text-base", children: it.word })
            ] }) }, it.word)) })
          ] }, g.category);
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setMode("exercise"), className: "w-full mt-6 py-5 px-6 rounded-none border-2 border-black bg-black text-white font-black text-xl hover:bg-white hover:text-black transition-all", children: "Übung machen" })
      ] }),
      mode === "exercise" && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-3xl bg-white p-5 sm:p-8 border-2 border-black animate-fade-in space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-black text-black", children: "Schreibübung" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setMode("learn"), className: "text-xs font-black text-black border-b-2 border-black", children: "Zurück" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border-2 border-black p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold", children: "Schreibe das Wort oder die Uhrzeit." }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-2xl border-2 border-black", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 bg-black text-white", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-2 text-xs font-black uppercase tracking-wider border-r border-white", children: "Deutsch" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-2 text-xs font-black uppercase tracking-wider", children: "Antwort" })
          ] }),
          zeitExercises.map((it, idx) => {
            const key = `zeit_${it.word}_${idx}`;
            const val = userAnswers[key] || "";
            const correct = checkZeitAnswer(it.word, val);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `grid grid-cols-2 border-t-2 border-black ${correct ? "bg-black/5" : ""}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-2.5 border-r-2 border-black flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-black text-black", children: it.label }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-2 flex items-center", children: correct ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-black text-black", children: [
                it.word,
                " ✓"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: val, onChange: (e) => handleZeitInput(it.word, idx, e.target.value), className: "w-full px-3 py-1.5 border-2 border-black text-sm font-black outline-none" }) })
            ] }, `${it.word}-${idx}`);
          })
        ] }),
        isZeitComplete && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 text-center border-2 border-black rounded-xl p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-black text-black", children: "Sehr gut!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(NextLessonButton, { currentId: lesson.id })
        ] })
      ] })
    ] }) : lessonId === "10" && reviewGroups ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      mode === "learn" && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-3xl bg-white/80 p-5 sm:p-8 shadow-lg ring-4 ring-white animate-fade-in space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-black text-foreground", children: "Wiederholung" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-muted-foreground", children: "Wiederhole alle bisherigen Themen" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl bg-foreground/5 p-4 border border-foreground/10 text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold", children: "Wiederhole alle bisherigen Themen und Beispiele." }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: reviewGroups.map((g, catIdx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border border-foreground/15 rounded-2xl p-4 sm:p-5 shadow-md space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-black", children: g.category }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: g.items.map((it, itemIdx) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-white rounded-xl px-4 py-2.5 text-sm font-black text-foreground shadow-sm border border-foreground/15 flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base font-black", children: it.full }) }, itemIdx)) })
        ] }, g.category)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setMode("exercise"), className: "w-full mt-6 py-5 px-6 rounded-3xl bg-gradient-to-r from-primary to-orange-400 text-white font-black text-xl sm:text-2xl shadow-xl hover:shadow-2xl ring-4 ring-white transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 select-none cursor-pointer group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "✏️ Übung machen!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl transition-transform group-hover:translate-x-1", children: "➔" })
        ] })
      ] }),
      mode === "exercise" && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-3xl bg-white/80 p-5 sm:p-8 shadow-lg ring-4 ring-white animate-fade-in space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-black text-foreground", children: "Schreibübung" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-muted-foreground", children: "Fülle die leeren Felder aus!" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setMode("learn"), className: "text-xs font-black text-primary hover:underline", children: "Lernstoff ansehen" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl bg-foreground/5 p-4 border border-foreground/10 text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold", children: "Schreibe die richtige Antwort für die Lücken in das Feld rechts!" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: reviewGroups.map((g, catIdx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-2xl border border-foreground/10 shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white border-b border-foreground/15 px-4 py-2.5 flex items-center gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground text-base font-black", children: g.category }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 bg-foreground/5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-2 text-xs font-black text-foreground/60 uppercase tracking-wider border-r border-foreground/10", children: "Frage" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-2 text-xs font-black text-foreground/60 uppercase tracking-wider", children: "Antwort" })
          ] }),
          g.items.map((it, itemIdx) => {
            const key = `rev_${catIdx}_${itemIdx}`;
            const val = userAnswers[key] || "";
            const correct = checkReviewAnswer(it.answer, val);
            const hasVal = val.length > 0;
            const isQuestion = it.answer.length > 0;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `grid grid-cols-2 border-t border-foreground/5 transition-colors ${!isQuestion ? "bg-foreground/5 opacity-80" : correct ? "bg-emerald-50" : itemIdx % 2 === 0 ? "bg-white" : "bg-white/50"}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-2.5 border-r border-foreground/10 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => speakDE(it.full), title: `${it.prompt} hören`, className: "text-sm font-black text-foreground hover:text-primary transition cursor-pointer select-none text-left", children: it.prompt }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-foreground/30", children: "🔊" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-2 flex items-center", children: !isQuestion ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-foreground/40 italic", children: "Beispiel (fertig)" }) : correct ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-black text-emerald-700 flex items-center gap-1", children: [
                it.answer,
                " ✅"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: val, onChange: (e) => handleReviewInput(it.answer, catIdx, itemIdx, e.target.value), placeholder: "?", maxLength: 30, className: `w-full px-3 py-1.5 rounded-xl border-2 text-sm font-black transition-all outline-none ${hasVal ? "bg-rose-100 border-rose-400 text-rose-800" : "bg-white border-dashed border-sky-300 focus:border-sky-500 focus:bg-sky-50/50"}` }) })
            ] }, itemIdx);
          })
        ] }, g.category)) }),
        isReviewComplete && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 text-center animate-bounce bg-emerald-50 border border-emerald-100 rounded-3xl p-5 shadow-inner", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-6xl", children: "🎉😊🎉" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-xl font-black text-emerald-700", children: "Großartig! Du hast die ganze Wiederholung geschafft!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(NextLessonButton, { currentId: lesson.id })
        ] })
      ] })
    ] }) : lessonId === "5" && lautkomGroups ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      mode === "learn" && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-3xl bg-white/80 p-5 sm:p-8 shadow-lg ring-4 ring-white animate-fade-in space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-black text-foreground", children: "Lautkombinationen" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-muted-foreground", children: "Lerne Lautkombinationen im Deutschen" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap justify-center", children: lautkomGroups.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-foreground text-white px-5 py-2 rounded-full text-lg font-black shadow-md select-none", children: g.label }, g.combo)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-5", children: lautkomGroups.map((g) => {
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-4 border border-foreground/10 space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-foreground text-white px-3 py-1 rounded-lg text-lg font-black shadow select-none", children: g.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base font-black text-foreground", children: "Deutsch" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-2", children: g.words.map((w) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-xl px-3 py-2 text-sm font-bold text-foreground shadow-sm border border-foreground/10 text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: highlightCombo(w, g.label) }) }, w)) })
          ] }, g.combo);
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setMode("exercise"), className: "w-full mt-6 py-5 px-6 rounded-3xl bg-gradient-to-r from-primary to-orange-400 text-white font-black text-xl sm:text-2xl shadow-xl hover:shadow-2xl ring-4 ring-white transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 select-none cursor-pointer group", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-8 w-8", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" }) }) })
      ] }),
      mode === "exercise" && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-3xl bg-white/80 p-5 sm:p-8 shadow-lg ring-4 ring-white animate-fade-in space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-black text-foreground", children: "Schreibübung" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-muted-foreground", children: "Fülle die leeren Felder aus!" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setMode("learn"), className: "text-xs font-black text-primary hover:underline", children: "Kombinationen lernen" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: lautkomGroups.map((g) => {
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-2xl border border-foreground/10 shadow-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-foreground/5 px-4 py-2.5 flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground text-xl font-black tracking-widest", children: g.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground/60 text-sm font-bold", children: [
                "Lautkombination – ",
                g.label
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 bg-foreground/5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-2 text-xs font-black text-foreground/60 uppercase tracking-wider border-r border-foreground/10", children: "Deutsch" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-2 text-xs font-black text-foreground/60 uppercase tracking-wider", children: "Schreibe hier" })
            ] }),
            g.words.map((w, idx) => {
              const val = userAnswers[`l_${w}`] || "";
              const correct = checkLautAnswer(w, val);
              const hasVal = val.length > 0;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `grid grid-cols-2 border-t border-foreground/5 transition-colors ${correct ? "bg-emerald-50" : idx % 2 === 0 ? "bg-white" : "bg-white/50"}`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-2.5 border-r border-foreground/10 flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-black text-foreground select-none", children: highlightCombo(w, g.label) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-2 flex items-center", children: correct ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-black text-emerald-700 flex items-center gap-1", children: [
                  w,
                  " ✅"
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: val, onChange: (e) => handleLautInput(w, e.target.value), placeholder: "?", maxLength: 30, className: `w-full px-3 py-1.5 rounded-xl border-2 text-sm font-black transition-all outline-none ${hasVal ? "bg-rose-100 border-rose-400 text-rose-800 animate-shake" : "bg-white border-dashed border-sky-300 focus:border-sky-500 focus:bg-sky-50/50"}` }) })
              ] }, w);
            })
          ] }, g.combo);
        }) }),
        isLautComplete && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 text-center animate-bounce bg-emerald-50 border border-emerald-100 rounded-3xl p-5 shadow-inner", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-6xl", children: "🎉😊🎉" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-xl font-black text-emerald-700", children: "Großartig! Du hast alle Lautkombinationen geschrieben!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(NextLessonButton, { currentId: lesson.id })
        ] })
      ] })
    ] }) : lessonId === "1" || lessonId === "2" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      mode === "learn" && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-3xl bg-white/80 p-5 sm:p-8 shadow-lg ring-4 ring-white animate-fade-in space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-black text-foreground", children: lessonId === "2" ? "Groß- und Kleinbuchstaben" : "Das Alphabet (ABC)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-muted-foreground", children: lessonId === "2" ? "Lerne alle Groß- und Kleinbuchstaben!" : "Lerne alle Buchstaben auf Deutsch!" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          alphabetRows.map((row, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-bold text-foreground/40 uppercase tracking-wider px-1", children: row.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `grid gap-1.5 sm:gap-2`, style: {
              gridTemplateColumns: `repeat(${row.letters.length}, minmax(0, 1fr))`
            }, children: row.letters.map((letter, letterIdx) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => speakLessonItem(letterProns[letter] || letter), className: `${palette[(idx + letterIdx) % palette.length]} flex items-center justify-center aspect-square rounded-2xl border-2 shadow-sm transition active:scale-90 group cursor-pointer`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl sm:text-3xl font-black group-hover:animate-bounce select-none", children: getLetterDisplay(letter) }) }, letter)) })
          ] }, row.id)),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 pt-2 border-t border-foreground/5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-black text-primary uppercase tracking-wider px-1 flex items-center gap-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Sonderbuchstaben" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-5 gap-2 max-w-sm", children: sonderRow.map((letter, letterIdx) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => speakLessonItem(letterProns[letter] || letter), className: "bg-white border-foreground/15 hover:bg-foreground/5 text-foreground flex items-center justify-center aspect-square rounded-2xl border-2 shadow-sm transition active:scale-90 group cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl sm:text-3xl font-black group-hover:animate-bounce select-none", children: getLetterDisplay(letter) }) }, letter)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setMode("exercise"), className: "w-full mt-6 py-5 px-6 rounded-3xl bg-gradient-to-r from-primary to-orange-400 text-white font-black text-xl sm:text-2xl shadow-xl hover:shadow-2xl ring-4 ring-white transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 select-none cursor-pointer group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "✏️ Übung machen!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl transition-transform group-hover:translate-x-1", children: "➔" })
        ] })
      ] }),
      mode === "exercise" && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-3xl bg-white/80 p-5 sm:p-8 shadow-lg ring-4 ring-white animate-fade-in space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-black text-foreground", children: lessonId === "2" ? "Schreibübung (A a)" : "Schreibübung (ABC)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-muted-foreground", children: "Fülle die leeren Felder aus!" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setMode("learn"), className: "text-xs font-black text-primary hover:underline", children: lessonId === "2" ? "Buchstaben lernen" : "ABC lernen" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
          alphabetRows.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 p-3 bg-white/40 rounded-2xl border border-foreground/5 shadow-inner", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-1.5 sm:gap-2", style: {
              gridTemplateColumns: `repeat(${row.letters.length}, minmax(0, 1fr))`
            }, children: row.letters.map((letter) => {
              const correct = checkAnswer(letter, userAnswers[letter] || "");
              return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { onClick: () => speakLessonItem(letterProns[letter] || letter), className: `flex items-center justify-center h-10 sm:h-12 rounded-xl text-lg sm:text-2xl font-black border shadow-sm select-none cursor-pointer transition active:scale-95 ${correct ? "bg-emerald-500 border-emerald-600 text-white animate-pulse" : "bg-white border-foreground/15 text-foreground"}`, children: getLetterDisplay(letter) }, `ref-${letter}`);
            }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-1.5 sm:gap-2", style: {
              gridTemplateColumns: `repeat(${row.letters.length}, minmax(0, 1fr))`
            }, children: row.letters.map((letter) => {
              const val = userAnswers[letter] || "";
              const correct = checkAnswer(letter, val);
              const hasVal = val.length > 0;
              return /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", maxLength: 8, value: val, disabled: correct, onChange: (e) => handleInputChange(letter, e.target.value), placeholder: "?", className: `w-full h-10 sm:h-12 text-center text-sm sm:text-base font-black rounded-xl border-2 transition-all outline-none ${correct ? "bg-emerald-100 border-emerald-500 text-emerald-800 shadow-inner" : hasVal ? "bg-rose-100 border-rose-400 text-rose-800 animate-shake" : "bg-white border-dashed border-sky-300 focus:border-sky-50/50"}` }, `input-${letter}`);
            }) })
          ] }, row.id)),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 p-3 bg-white rounded-2xl border border-foreground/10 shadow-inner", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-black text-foreground/40 uppercase tracking-wider px-1", children: "Sonderbuchstaben" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-5 gap-2 max-w-sm", children: sonderRow.map((letter) => {
              const correct = checkAnswer(letter, userAnswers[letter] || "");
              return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { onClick: () => speakLessonItem(letterProns[letter] || letter), className: `flex items-center justify-center h-10 sm:h-12 rounded-xl text-lg sm:text-2xl font-black border shadow-sm select-none cursor-pointer transition active:scale-95 ${correct ? "bg-emerald-500 border-emerald-600 text-white animate-pulse" : "bg-white border-foreground/15 text-foreground"}`, children: getLetterDisplay(letter) }, `ref-${letter}`);
            }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-5 gap-2 max-w-sm", children: sonderRow.map((letter) => {
              const val = userAnswers[letter] || "";
              const correct = checkAnswer(letter, val);
              const hasVal = val.length > 0;
              return /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", maxLength: 8, value: val, disabled: correct, onChange: (e) => handleInputChange(letter, e.target.value), placeholder: "?", className: `w-full h-10 sm:h-12 text-center text-sm sm:text-base font-black rounded-xl border-2 transition-all outline-none ${correct ? "bg-emerald-100 border-emerald-500 text-emerald-800 shadow-inner" : hasVal ? "bg-rose-100 border-rose-400 text-rose-800 animate-shake" : "bg-white border-dashed border-sky-300 focus:border-sky-50/50"}` }, `input-${letter}`);
            }) })
          ] })
        ] }),
        isABCComplete && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 text-center animate-bounce bg-emerald-50 border border-emerald-100 rounded-3xl p-5 shadow-inner", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-6xl", children: "🎉😊🎉" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-xl font-black text-emerald-700", children: lessonId === "2" ? "Großartig! Du hast alle Groß- und Kleinbuchstaben geschrieben!" : "Großartig! Du hast das ganze ABC geschrieben!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(NextLessonButton, { currentId: lesson.id })
        ] })
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      mode === "learn" && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-3xl bg-white/80 p-6 sm:p-8 shadow-lg ring-4 ring-white animate-fade-in", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-2xl", children: "🏫" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-black text-foreground", children: "Lernzeit mit dem Lehrer" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-muted-foreground", children: "Der Lehrer zeigt dir das Thema" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 rounded-2xl bg-amber-50/50 p-4 border border-amber-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base sm:text-lg font-black text-foreground", children: lesson.intro }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-bold text-foreground/60 uppercase tracking-wider mb-3", children: "Tippe auf die Karten zum Hören:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-3", children: lesson.items.map((it) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => speakDE(it.replace(/[^\p{L}\p{N} ]/gu, "").trim() || it), className: "flex flex-col items-center justify-center gap-2 rounded-2xl bg-amber-100/80 hover:bg-amber-100 p-4 text-xl sm:text-2xl font-black shadow-md border-2 border-white transition-all hover:scale-105 active:scale-95 hover:shadow-lg group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "group-hover:animate-bounce", children: it.split(" ")[0] }),
            it.split(" ")[1] && lessonId !== "7" && lessonId !== "8" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-foreground/60", children: it.split(" ")[1] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs opacity-75", children: "🔊" })
          ] }, it)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setMode("exercise"), className: "w-full mt-8 py-5 px-6 rounded-3xl bg-gradient-to-r from-primary to-orange-400 text-white font-black text-xl sm:text-2xl shadow-xl hover:shadow-2xl ring-4 ring-white transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 select-none cursor-pointer group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "✏️ Übung machen!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl transition-transform group-hover:translate-x-1", children: "➔" })
        ] })
      ] }),
      mode === "exercise" && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-3xl bg-white/80 p-6 sm:p-8 shadow-lg ring-4 ring-white animate-fade-in", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-2xl", children: "✏️" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-black text-foreground", children: "Übung machen" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-muted-foreground", children: "Finde die richtige Antwort!" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
            setMode("learn");
            setPicked(null);
          }, className: "text-xs font-black text-primary hover:underline", children: "Lernstoff ansehen" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg sm:text-xl font-black text-foreground/80", children: ex.prompt }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-col items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => speakDE(ex.speak), className: "flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-full bg-primary text-5xl text-primary-foreground shadow-xl hover:shadow-2xl ring-8 ring-white transition-all hover:scale-110 active:scale-90 animate-pulse cursor-pointer", "aria-label": "Nochmal hören", children: "🔊" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-foreground/50 animate-bounce", children: "Tippe auf den Lautsprecher!" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 grid grid-cols-2 gap-3 max-w-md mx-auto", children: ex.options.map((opt) => {
          const chosen = picked === opt;
          const correct = opt === ex.answer;
          const showState = picked !== null && (chosen || correct);
          const cls = showState ? correct ? "bg-emerald-300 border-emerald-500 text-emerald-950 scale-105" : chosen ? "bg-rose-300 border-rose-500 text-rose-950" : "bg-sky-200 border-white text-foreground" : "bg-sky-300 border-white text-foreground hover:bg-sky-200";
          return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => choose(opt), disabled: picked !== null && isCorrect, className: `${cls} aspect-square rounded-3xl text-4xl sm:text-5xl font-black border-4 shadow-md transition-all duration-200 active:scale-95 cursor-pointer flex items-center justify-center`, children: opt }, opt);
        }) }),
        picked !== null && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 text-center animate-bounce", children: isCorrect ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-emerald-50 border border-emerald-100 rounded-3xl p-5 shadow-inner", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-6xl", children: "🎉😊🎉" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-xl font-black text-emerald-700", children: "Super gemacht! Perfekt!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(NextLessonButton, { currentId: lesson.id })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-rose-50 border border-rose-100 rounded-3xl p-5 shadow-inner", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-6xl", children: "😢" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-lg font-black text-rose-700", children: "Och, schade! Versuchs noch einmal!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setPicked(null), className: "mt-4 rounded-full bg-primary px-6 py-2.5 text-base font-black text-primary-foreground shadow active:scale-95 transition-all hover:scale-105 cursor-pointer", children: "Nochmal versuchen" })
        ] }) })
      ] })
    ] })
  ] }) });
}
function NextLessonButton({
  currentId
}) {
  const idx = lessons.findIndex((l) => l.id === currentId);
  const next = lessons[idx + 1];
  if (!next) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/lessons", className: "mt-4 inline-block rounded-full bg-emerald-600 hover:bg-emerald-700 px-6 py-3 text-base font-black text-white shadow-lg active:scale-95 transition-all hover:scale-105 cursor-pointer", children: "🏁 Zurück zu den Lektionen" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/lessons/$lessonId", params: {
    lessonId: next.id
  }, className: "mt-4 inline-block rounded-full bg-primary px-6 py-3 text-base font-black text-primary-foreground shadow-lg active:scale-95 transition-all hover:scale-105 cursor-pointer", children: "Nächste Lektion →" });
}
export {
  LessonPage as component
};
