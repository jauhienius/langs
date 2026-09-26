# 06: Export and Import

**What to build:** "Export" downloads the whole History as a JSON file; "Import" loads such a file and merges it into the History on this device. This is the only way to back up the History or move it between the phone and the PC. See spec: `.scratch/translation-table/spec.md` (Export and Import, data shapes) and ADR-0002.

**Blocked by:** 04

**Status:** ready-for-agent

- [ ] Export file: JSON with a format marker, a version and the list of Entries; never contains the API key or other settings
- [ ] Import validates marker, version and Entry shape before any change
- [ ] Import merges by Entry ID, then sorts all Entries by time, newest first
- [ ] Importing the same file twice changes nothing
- [ ] Invalid or foreign file: short message, History unchanged
- [ ] Core tests: Export excludes the key; Export→Import round trip; merge by ID; idempotent re-import; invalid file rejected with no change
- [ ] Visual check through Playwright: Export, clear, Import restores the History
