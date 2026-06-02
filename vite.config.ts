// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  // Use Vercel preset so `npm run build` outputs to .vercel/output (auto-detected by Vercel)
  nitro: {
    preset: "vercel",
  },
  vite: {
    plugins: (function () {
      const p = [] as any[];
      try {
        // Load the PWA plugin only if it's installed to avoid type errors during tsc
        // @ts-ignore
        const { VitePWA } = require("vite-plugin-pwa");
        p.push(
          VitePWA({
            registerType: "autoUpdate",
            includeAssets: ["icon.svg", "abc_mit_wie_chart.png", "umlaute_wie_cards.png"],
            workbox: {
              globPatterns: ["**/*.{js,css,html,svg,png,mp3}"],
            },
            // Let public/manifest.json be used; plugin will still generate SW
            injectRegister: "auto",
          }),
        );
      } catch (e) {
        // plugin not installed — continue without PWA support
      }
      return p;
    })(),
  },
});
