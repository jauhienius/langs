# 01: Project skeleton and deploy

**What to build:** The app exists as a live web page on GitHub Pages: an empty four-column table (Belarusian, Polish, English, Russian) with the empty input line at the top. Every push deploys automatically. The tooling for all later tickets (Vite + vanilla TypeScript, `vite-plugin-pwa`, Vitest) is in place. See spec: `.scratch/translation-table/spec.md`.

**Blocked by:** None (can start immediately)

**Status:** done — live at https://jauhienius.github.io/langs/

- [x] Git repository initialised; `.gitignore` excludes `.env.local`, `node_modules` and build output
- [x] Vite + vanilla TypeScript project builds with no errors; no UI framework
- [x] `vite-plugin-pwa` installed and wired (full manifest/icons come in ticket 07)
- [x] Vitest runs (one trivial passing test is enough)
- [x] Page shows the four Language columns in the order Belarusian, Polish, English, Russian, with one empty input cell per column at the top
- [x] Layout works at phone width (no horizontal page scroll) and at desktop width
- [x] GitHub Action builds and deploys to GitHub Pages on push to the default branch; base path matches the Pages URL
- [x] Human step: the user creates the public GitHub repository and enables Pages (source: GitHub Actions)
- [x] Visual check through Playwright at phone and desktop width
