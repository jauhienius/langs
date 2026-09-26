# 07: Offline and PWA install

**What to build:** The user can install the app to the phone home screen and open it like a native app. With no network, the full History is visible, and the input line shows "offline" and sends nothing; no Words are queued. See spec: `.scratch/translation-table/spec.md` (PWA, offline, platform).

**Blocked by:** 04

**Status:** ready-for-human (only the phone install step is left)

- [x] Complete web app manifest (name, icons, theme colour, standalone display) and a service worker that caches the app shell
- [x] App opens offline and shows the full History from storage
- [x] While offline, the input line shows "offline" and submitting does nothing; it becomes active again when the network returns
- [x] No request queue while offline
- [x] Core test: submit is blocked while offline
- [x] Visual check through Playwright with the network set to offline
- [ ] Human step: the user installs the app on the phone from the GitHub Pages URL and confirms it opens from the home screen, online and offline

## Comments

- Offline: the input line gets an "offline" label in every cell (also cells that hold a Word) and the cells are read-only, which is a little stricter than "submitting does nothing". Nothing is queued (tested).
- Update flow: registerType autoUpdate with the injected registerSW.js only registers the new worker; the page is not reloaded, so a new version starts at the next launch.
- Gemini POST requests are never cached (no runtimeCaching; precache holds build files only).
- iOS: a home-screen app has its own localStorage, separate from Safari. Use Export/Import to move the History between them.
