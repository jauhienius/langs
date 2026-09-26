# 07: Offline and PWA install

**What to build:** The user can install the app to the phone home screen and open it like a native app. With no network, the full History is visible, and the input line shows "offline" and sends nothing; no Words are queued. See spec: `.scratch/translation-table/spec.md` (PWA, offline, platform).

**Blocked by:** 04

**Status:** ready-for-agent

- [ ] Complete web app manifest (name, icons, theme colour, standalone display) and a service worker that caches the app shell
- [ ] App opens offline and shows the full History from storage
- [ ] While offline, the input line shows "offline" and submitting does nothing; it becomes active again when the network returns
- [ ] No request queue while offline
- [ ] Core test: submit is blocked while offline
- [ ] Visual check through Playwright with the network set to offline
- [ ] Human step: the user installs the app on the phone from the GitHub Pages URL and confirms it opens from the home screen, online and offline
