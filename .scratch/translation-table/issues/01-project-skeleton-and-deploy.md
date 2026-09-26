# 01: Project skeleton and deploy

**What to build:** The app exists as a live web page on GitHub Pages: an empty four-column table (Belarusian, Polish, English, Russian) with the empty input line at the top. Every push deploys automatically. The tooling for all later tickets (Vite + vanilla TypeScript, `vite-plugin-pwa`, Vitest) is in place. See spec: `.scratch/translation-table/spec.md`.

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

- [ ] Git repository initialised; `.gitignore` excludes `.env.local`, `node_modules` and build output
- [ ] Vite + vanilla TypeScript project builds with no errors; no UI framework
- [ ] `vite-plugin-pwa` installed and wired (full manifest/icons come in ticket 07)
- [ ] Vitest runs (one trivial passing test is enough)
- [ ] Page shows the four Language columns in the order Belarusian, Polish, English, Russian, with one empty input cell per column at the top
- [ ] Layout works at phone width (no horizontal page scroll) and at desktop width
- [ ] GitHub Action builds and deploys to GitHub Pages on push to the default branch; base path matches the Pages URL
- [ ] Human step: the user creates the public GitHub repository and enables Pages (source: GitHub Actions)
- [ ] Visual check through Playwright at phone and desktop width
