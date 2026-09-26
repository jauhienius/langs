# 02: Key setup and first translation

**What to build:** On first start the app asks only for the Gemini API key and remembers it on this device; "⚙" lets the user change or remove it. The user types a Word into the column of its Source Language and presses Enter; the Word stays in its cell with a spinner, and when Gemini answers a new Entry appears directly under the input line with translations in the other three columns (one per Meaning, up to three only for homonyms). A Language Mismatch shows a short message under the input line, creates no Entry, and keeps the Word. In this ticket the History lives only in memory. See spec: `.scratch/translation-table/spec.md` (Gemini prompt contract, data shapes) and ADR-0001.

**Blocked by:** 01

**Status:** ready-for-agent

- [ ] Core module with an injected Translator interface: `(Word, Source Language) → Translation | Language Mismatch | Error`
- [ ] Gemini Translator calls the native `generateContent` endpoint of `gemini-3.8-flash` from the browser, key in the `x-goog-api-key` header, temperature 0, JSON response schema, prompt exactly as in the spec
- [ ] Gemini Translator trims each list to 3 items and removes duplicates
- [ ] Model ID defined in one place
- [ ] Settings: key stored in localStorage; first-start screen shows only the key field; "⚙" changes or removes the key
- [ ] Enter (and the phone keyboard enter/go key) submits; empty or whitespace-only input does nothing; the Word is trimmed
- [ ] Spinner in the cell while pending; input cell cleared after a successful Entry
- [ ] New Entry appears at the top, Word in its Source Language column
- [ ] Language Mismatch: message under the input line, no Entry, Word kept in its cell
- [ ] UI text in English
- [ ] Core tests (Vitest, fake Translator): success adds Entry at top; Language Mismatch adds nothing and keeps the Word; trimming and empty input
- [ ] Visual check through Playwright at phone and desktop width, including one real translation
