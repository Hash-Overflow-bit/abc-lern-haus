// Service Worker for Deutsch ABC für Kinder
// Provides offline UI support by caching the app shell and static assets.

const CACHE_NAME = "deutsch-abc-v1";

// Core app shell files to pre-cache on install
const APP_SHELL = ["/", "/icon.svg", "/manifest.json"];

// ─── Install: pre-cache the app shell ───
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  // Activate immediately without waiting for old tabs to close
  self.skipWaiting();
});

// ─── Activate: clean up old caches ───
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  // Take control of all open tabs immediately
  self.clients.claim();
});

// ─── Fetch: serve cached content when offline ───
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle same-origin requests
  if (url.origin !== self.location.origin) return;

  // --- Static assets (JS, CSS, images, fonts): Cache-First ---
  if (
    url.pathname.startsWith("/assets/") ||
    url.pathname.endsWith(".svg") ||
    url.pathname.endsWith(".png") ||
    url.pathname.endsWith(".jpg") ||
    url.pathname.endsWith(".jpeg") ||
    url.pathname.endsWith(".webp") ||
    url.pathname.endsWith(".woff2") ||
    url.pathname.endsWith(".woff") ||
    url.pathname.endsWith(".css") ||
    url.pathname.endsWith(".js")
  ) {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ||
          fetch(request).then((response) => {
            // Cache a copy of the response for next time
            if (response.ok) {
              const clone = response.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
            }
            return response;
          })
      )
    );
    return;
  }

  // --- manifest.json: Cache-First ---
  if (url.pathname === "/manifest.json") {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ||
          fetch(request).then((response) => {
            if (response.ok) {
              const clone = response.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
            }
            return response;
          })
      )
    );
    return;
  }

  // --- Page navigations (HTML): Network-First with cache fallback ---
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache the latest page response
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(() => {
          // Offline: try the cached version, then fall back to cached "/"
          return caches
            .match(request)
            .then((cached) => cached || caches.match("/"));
        })
    );
    return;
  }
});
