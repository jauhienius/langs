# 04: History persistence

**What to build:** All Entries are kept on this device, newest first, and survive closing the tab, reloading and restarting the phone. Typing the same Word again creates a new Entry at the top. The time of each Entry is recorded but not shown. Scrolling stays smooth with thousands of Entries. See spec: `.scratch/translation-table/spec.md` and ADR-0002.

**Blocked by:** 02

**Status:** done

- [x] Core gets an injected History storage interface (load all / save all)
- [x] Real implementation over localStorage; tests use an in-memory implementation
- [x] Entry shape as in the spec: `ID`, `created_at`, `source_language`, `word`, translations per Language
- [x] History loads on start and shows newest first
- [x] A repeated Word creates a new Entry (no de-duplication)
- [x] Entry time recorded, not displayed
- [x] Rendering stays smooth with at least 5,000 Entries (checked with generated data)
- [x] Core tests: Entries survive a reload through storage; order newest first; repeated Word adds a new Entry
- [x] Visual check through Playwright: add Entries, reload, Entries still there

## Comments

- Measured with 5,000 generated Entries (Chromium, phone size): load and render ~230 ms, typing 19 characters ~90 ms, scroll to end ~29 ms.
- Robustness from review: a failed save keeps the Entry on screen and shows a message; unreadable stored data (bad JSON, other version, bad Entry) is moved to `langs.history.corrupt.<time>` and never overwritten (if the backup fails, saving stops); another tab changing the History triggers a reload. `entry_valid` is shared with Import (ticket 06).
