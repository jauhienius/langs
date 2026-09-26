# 03: Errors and limits

**What to build:** When a translation fails, the user sees one short message under the input line that says what happened and what to do, and the Word stays in its cell so retrying is one key press. The user cannot submit a Word twice while it is pending. The app never retries automatically and never falls back to another provider. See spec: `.scratch/translation-table/spec.md` (Errors and limits).

**Blocked by:** 02

**Status:** ready-for-agent

- [ ] Translator Error outcomes: invalid key, per-minute limit (with retry-after seconds when the API gives them), daily limit, provider busy, network/offline, malformed response
- [ ] Gemini Translator maps HTTP 429 to per-minute vs daily limit using the quota information in the error body (not hard-coded limit values); 503 maps to busy; key errors map to invalid key
- [ ] A distinct, short English message for each Error type; the invalid-key message points to "⚙"
- [ ] The Word stays in its cell after any Error
- [ ] Submitting the same cell again while pending does nothing
- [ ] No automatic retry, no fallback provider
- [ ] Core tests (fake Translator) for each Error type and for the double-submit block
- [ ] Visual check through Playwright of at least one error message (e.g. with an invalid key)
