# 06: Export and Import

**What to build:** "Export" downloads the whole History as a JSON file; "Import" loads such a file and merges it into the History on this device. This is the only way to back up the History or move it between the phone and the PC. See spec: `.scratch/translation-table/spec.md` (Export and Import, data shapes) and ADR-0002.

**Blocked by:** 04

**Status:** done

- [x] Export file: JSON with a format marker, a version and the list of Entries; never contains the API key or other settings
- [x] Import validates marker, version and Entry shape before any change
- [x] Import merges by Entry ID, then sorts all Entries by time, newest first
- [x] Importing the same file twice changes nothing
- [x] Invalid or foreign file: short message, History unchanged
- [x] Core tests: Export excludes the key; Export→Import round trip; merge by ID; idempotent re-import; invalid file rejected with no change
- [x] Visual check through Playwright: Export, clear, Import restores the History

## Comments

- Merge rule: an ID already on this device keeps the local Entry; duplicate IDs inside a file keep the first. An Import with no new Entry only shows the message (no sort, no save).
- A file that cannot be read gets the same "nothing was changed" message. The download URL is released after 10 s so older browsers finish the download.
- On iOS Safari, Export may open a preview first; check on the phone (ticket 07 human step).
