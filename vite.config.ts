import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// The GitHub Action sets BASE_PATH to "/<repository>/" for GitHub Pages; locally the app runs at "/".
export default defineConfig({
    base: process.env.BASE_PATH ?? "/",
    plugins: [
        VitePWA({
            registerType: "autoUpdate",
            // Full manifest and icons: ticket 07.
            manifest: { name: "Langs", short_name: "Langs", display: "standalone" }, // e401e7694ced: app name, also in index.html <title>
        }),
    ],
});
