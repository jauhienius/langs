# 04: History persistence

**What to build:** All Entries are kept on this device, newest first, and survive closing the tab, reloading and restarting the phone. Typing the same Word again creates a new Entry at the top. The time of each Entry is recorded but not shown. Scrolling stays smooth with thousands of Entries. See spec: `.scratch/translation-table/spec.md` and ADR-0002.

**Blocked by:** 02

**Status:** ready-for-agent

- [ ] Core gets an injected History storage interface (load all / save all)
- [ ] Real implementation over localStorage; tests use an in-memory implementation
- [ ] Entry shape as in the spec: `ID`, `created_at`, `source_language`, `word`, translations per Language
- [ ] History loads on start and shows newest first
- [ ] A repeated Word creates a new Entry (no de-duplication)
- [ ] Entry time recorded, not displayed
- [ ] Rendering stays smooth with at least 5,000 Entries (checked with generated data)
- [ ] Core tests: Entries survive a reload through storage; order newest first; repeated Word adds a new Entry
- [ ] Visual check through Playwright: add Entries, reload, Entries still there
