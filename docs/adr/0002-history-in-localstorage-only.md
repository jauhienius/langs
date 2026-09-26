# History lives only in the browser, with manual Export/Import

The History is stored in localStorage on each device, with no server database and no sync. This follows from having no backend (ADR-0001) and keeps the app free and trivial to host. Export/Import of a JSON file is the only backup and the only way to move a History between devices; Import merges by Entry ID so re-importing the same file is harmless.

## Consequences

- Clearing browser data loses the History unless it was exported.
- Phone and desktop Histories diverge by design until the user exports on one and imports on the other.
