import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

const THEME_COLOR = "#2563eb"; // 5ce3ff5a09a1: also in index.html <meta name="theme-color">, public/icon.svg and style.css --color-focus
const BACKGROUND_COLOR = "#ffffff"; // 51ed43f19e8a: also --color-background in style.css

// The GitHub Action sets BASE_PATH to "/<repository>/" for GitHub Pages; locally the app runs at "/".
export default defineConfig({
    base: process.env.BASE_PATH ?? "/",
    plugins: [
        VitePWA({
            // The injected registerSW.js only registers the new worker; the page is not reloaded, so the new version starts next time.
            registerType: "autoUpdate",
            includeAssets: ["icon.svg", "apple-touch-icon.png"],
            // The service worker caches the app shell, so the app opens offline; Gemini calls are never cached.
            workbox: { globPatterns: ["**/*.{js,css,html,svg,png,webmanifest}"], navigateFallback: "index.html" },
            manifest: {
                name: "Langs", // e401e7694ced: app name, also in index.html <title>
                short_name: "Langs", // e401e7694ced
                description: "One word in Belarusian, Polish, English and Russian",
                display: "standalone",
                start_url: ".",
                scope: ".",
                theme_color: THEME_COLOR,
                background_color: BACKGROUND_COLOR,
                icons: [
                    { src: "icon-192.png", sizes: "192x192", type: "image/png" },
                    { src: "icon-512.png", sizes: "512x512", type: "image/png" },
                    { src: "icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
                ],
            },
        }),
    ],
});
