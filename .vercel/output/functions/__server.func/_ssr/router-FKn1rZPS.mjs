import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { Q as redirect } from "../_libs/tanstack__router-core.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
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
const appCss = "/assets/styles-B4ypkVsp.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
const PREFERRED_VOICE_KEYWORDS = [
  "google deutsch",
  "google de",
  "microsoft hedda",
  "microsoft katja",
  "microsoft stefan",
  "microsoft hans",
  "microsoft hilde",
  "anna",
  // macOS/iOS premium German voice
  "markus",
  "yannick",
  "de-de",
  "de_de",
  "deutsch",
  "german"
];
let _cachedVoice = null;
let _voicesLoaded = false;
function scoreVoice(v) {
  const name = v.name.toLowerCase();
  for (let i = 0; i < PREFERRED_VOICE_KEYWORDS.length; i++) {
    if (name.includes(PREFERRED_VOICE_KEYWORDS[i])) {
      return PREFERRED_VOICE_KEYWORDS.length - i;
    }
  }
  return 0;
}
function pickBestGermanVoice() {
  const all = window.speechSynthesis.getVoices();
  const german = all.filter((v) => v.lang.startsWith("de"));
  if (german.length === 0) return null;
  german.sort((a, b) => {
    const diff = scoreVoice(b) - scoreVoice(a);
    if (diff !== 0) return diff;
    return a.localService === b.localService ? 0 : b.localService ? -1 : 1;
  });
  return german[0];
}
function ensureVoice() {
  if (_cachedVoice) return _cachedVoice;
  _cachedVoice = pickBestGermanVoice();
  return _cachedVoice;
}
if (typeof window !== "undefined" && "speechSynthesis" in window) {
  if (window.speechSynthesis.getVoices().length > 0) {
    _voicesLoaded = true;
    _cachedVoice = pickBestGermanVoice();
  } else {
    window.speechSynthesis.addEventListener("voiceschanged", () => {
      if (!_voicesLoaded) {
        _voicesLoaded = true;
        _cachedVoice = pickBestGermanVoice();
      }
    });
  }
}
function speakDE(text) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "de-DE";
  u.rate = 0.82;
  u.pitch = 1;
  u.volume = 1;
  const voice = ensureVoice();
  if (voice) u.voice = voice;
  window.speechSynthesis.speak(u);
}
function warmupSpeech() {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.getVoices();
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  reactExports.useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$8 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Deutsch ABC für Kinder" },
      { name: "description", content: "Spielerisch Deutsch lernen: Alphabet und Zahlen." },
      { name: "theme-color", content: "#22c55e" },
      { property: "og:title", content: "Deutsch ABC für Kinder" },
      { property: "og:description", content: "Spielerisch Deutsch lernen: Alphabet und Zahlen." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "Deutsch ABC für Kinder" },
      { name: "twitter:description", content: "Spielerisch Deutsch lernen: Alphabet und Zahlen." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/512597d3-5b18-4099-9bc0-82e874a00df0/id-preview-1e1d7f40--e99a6c86-d1c0-43a5-a426-2e94ba48f892.lovable.app-1780329840895.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/512597d3-5b18-4099-9bc0-82e874a00df0/id-preview-1e1d7f40--e99a6c86-d1c0-43a5-a426-2e94ba48f892.lovable.app-1780329840895.png" }
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss
      },
      { rel: "manifest", href: "/manifest.json" },
      { rel: "icon", href: "/icon.svg", type: "image/svg+xml" },
      { rel: "apple-touch-icon", href: "/icon.svg" }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$8.useRouteContext();
  reactExports.useEffect(() => {
    warmupSpeech();
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) });
}
const $$splitComponentImporter$7 = () => import("./numbers-ClJUZQ9z.mjs");
const Route$7 = createFileRoute("/numbers")({
  head: () => ({
    meta: [{
      title: "Zahlen – Deutsch ABC"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./listening-CGKZUOuJ.mjs");
const Route$6 = createFileRoute("/listening")({
  head: () => ({
    meta: [{
      title: "Hören – Deutsch ABC"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./lessons-x7j2iU_r.mjs");
const Route$5 = createFileRoute("/lessons")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./clock-D9Mv0Ywi.mjs");
const Route$4 = createFileRoute("/clock")({
  head: () => ({
    meta: [{
      title: "Uhrzeit – Deutsch ABC"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./alphabet-KufXoldb.mjs");
const Route$3 = createFileRoute("/alphabet")({
  head: () => ({
    meta: [{
      title: "Alphabet – Deutsch ABC"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./index-BTU5dmpx.mjs");
const Route$2 = createFileRoute("/")({
  loader: () => {
    throw redirect({
      to: "/lessons/$lessonId",
      params: {
        lessonId: "1"
      }
    });
  },
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./lessons.index-BTU5dmpx.mjs");
const Route$1 = createFileRoute("/lessons/")({
  loader: () => {
    throw redirect({
      to: "/lessons/$lessonId",
      params: {
        lessonId: "1"
      }
    });
  },
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./lessons._lessonId-C7adzWtV.mjs");
const Route = createFileRoute("/lessons/$lessonId")({
  head: ({
    params
  }) => ({
    meta: [{
      title: `Lektion ${params.lessonId} – Deutsch ABC`
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const NumbersRoute = Route$7.update({
  id: "/numbers",
  path: "/numbers",
  getParentRoute: () => Route$8
});
const ListeningRoute = Route$6.update({
  id: "/listening",
  path: "/listening",
  getParentRoute: () => Route$8
});
const LessonsRoute = Route$5.update({
  id: "/lessons",
  path: "/lessons",
  getParentRoute: () => Route$8
});
const ClockRoute = Route$4.update({
  id: "/clock",
  path: "/clock",
  getParentRoute: () => Route$8
});
const AlphabetRoute = Route$3.update({
  id: "/alphabet",
  path: "/alphabet",
  getParentRoute: () => Route$8
});
const IndexRoute = Route$2.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$8
});
const LessonsIndexRoute = Route$1.update({
  id: "/",
  path: "/",
  getParentRoute: () => LessonsRoute
});
const LessonsLessonIdRoute = Route.update({
  id: "/$lessonId",
  path: "/$lessonId",
  getParentRoute: () => LessonsRoute
});
const LessonsRouteChildren = {
  LessonsLessonIdRoute,
  LessonsIndexRoute
};
const LessonsRouteWithChildren = LessonsRoute._addFileChildren(LessonsRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  AlphabetRoute,
  ClockRoute,
  LessonsRoute: LessonsRouteWithChildren,
  ListeningRoute,
  NumbersRoute
};
const routeTree = Route$8._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route as R,
  router as r,
  speakDE as s
};
