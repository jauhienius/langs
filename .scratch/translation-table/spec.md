Status: ready-for-agent

# Spec: Translation table

## Problem Statement

I often need one word in all four of my languages at once — Belarusian, Polish, English and Russian. Existing translators work one language pair at a time, need several clicks per pair, handle Belarusian poorly, and forget what I looked up. I want to type a word once, in the language I know it is in, and see it in the other three immediately, with everything I looked up before still there below when I scroll down.

## Solution

A dead-simple installable web app (PWA) that is one four-column table: Belarusian, Polish, English, Russian. The top line is an empty input line. I type a Word into the column of its Language and press Enter; after a few seconds a new Entry appears directly under the input line with the Word in its column and its translations in the other three. Older Entries move down, forming the History. If the Word is not a word of that column's Language, the app says so and creates nothing. I can delete an Entry (with Undo), and I can Export and Import the History as a file to back it up or move it between my phone and PC.

The app has no backend. It calls Gemini directly from the browser with my own API key, stored only in the browser. Hosting is free static hosting.

## User Stories

### First start and settings

1. As the user, I want the app to ask for my Gemini API key on first start, so that it can translate without any server of its own.
2. As the user, I want the first-start screen to show only the key field, so that setup takes seconds.
3. As the user, I want my key remembered on this device, so that I enter it only once.
4. As the user, I want a small "⚙" button, so that I can change or remove my key later.
5. As the user, I want a clear message when my key is rejected by Gemini, so that I know to fix the key rather than retry.
6. As the user, I want my key never to be written into an Export file, so that sharing or storing a backup does not leak it.

### Entering a Word

7. As the user, I want a four-column table with the columns Belarusian, Polish, English, Russian, so that I see all Languages side by side.
8. As the user, I want an empty input line at the top of the table, so that I always know where to type.
9. As the user, I want to type a Word into the cell of the column whose Language it belongs to, so that the Source Language is always my explicit choice.
10. As the user, I want to submit with Enter (and the phone keyboard's "go"/"enter" key), so that entering is fast on both PC and phone.
11. As the user, I want to enter short phrases of up to about five words (e.g. "make up", "dzień dobry"), so that idioms and phrasal verbs work too.
12. As the user, I want the app never to guess the Source Language, so that no compute or time is wasted on detection.
13. As the user, I want leading/trailing spaces ignored and empty input ignored, so that accidental submits do nothing.
14. As the user, I want the Word to stay in its cell with a small spinner while the translation is running, so that I see the app is working.
15. As the user, I want to be prevented from double-submitting the same pending Word, so that I don't burn my request quota.

### Result

16. As the user, I want a new Entry to appear directly under the input line when the translation completes, so that the newest result is where my eyes already are.
17. As the user, I want the Entry to show my Word in its Source Language column and the translations in the other three, so that the table stays aligned by Language.
18. As the user, I want one translation per cell for ordinary Words, so that the table stays clean.
19. As the user, I want up to three comma-separated translations only when the Word is a homonym (e.g. "zamek" → "castle, lock, zipper"), so that I don't lose genuinely different Meanings.
20. As the user, I want no synonyms, stress marks, or grammar notes in cells, so that the table stays "dead simple".
21. As the user, I want Belarusian in the official Cyrillic orthography, so that the result matches the standard I use.
22. As the user, I want the input cell cleared after a successful Entry, so that I can type the next Word immediately.

### Language Mismatch

23. As the user, I want the app to tell me when my Word is not a word of the column's Language (e.g. "dom" typed into English), so that I notice my mistake.
24. As the user, I want a Language Mismatch to create no Entry, so that my History contains only valid Entries.
25. As the user, I want the Word kept in its cell after a Language Mismatch, so that I can move it to the right column or fix a typo without retyping.
26. As the user, I want a word valid in the column's Language accepted even if it also exists elsewhere (e.g. "дом" in Belarusian), so that shared words are not rejected.

### Errors and limits

27. As the user, I want a short message under the input line when the per-minute limit is hit (with the wait time if known), so that I know when to retry.
28. As the user, I want a distinct message when the daily limit is reached, so that I know retrying today is pointless.
29. As the user, I want a distinct message when Gemini is busy ("high demand"), so that I know to retry shortly.
30. As the user, I want the Word kept in its cell after any error, so that retrying is one key press.
31. As the user, I want the app not to retry automatically and not to fall back to another provider, so that behaviour and quota use stay predictable.

### History

32. As the user, I want all my Entries kept on this device, newest first, so that I can scroll down through what I looked up.
33. As the user, I want the History to survive closing the tab, reloading, and restarting the phone, so that nothing is lost in normal use.
34. As the user, I want typing the same Word again to create a new Entry at the top, so that the History reflects what I actually looked up and when.
35. As the user, I want the time of each Entry recorded but not shown, so that the table stays four columns while ordering and Import still work.
36. As the user, I want scrolling to stay smooth with hundreds or thousands of Entries, so that the app stays usable after months.

### Delete and Undo

37. As the user, I want a small "×" on each Entry, so that I can remove typos and bad results.
38. As the user, I want deletion without a confirmation dialog, so that cleaning up on the phone is quick.
39. As the user, I want an "Undo" message for about five seconds after a delete, so that an accidental tap is harmless.
40. As the user, I want an undone Entry restored in its original place, so that the History order is unchanged.
41. As the user, I do not want to edit Entries, so that the app stays simple (I delete and re-enter instead).

### Export and Import

42. As the user, I want an "Export" button that downloads the whole History as a JSON file, so that I can back it up.
43. As the user, I want an "Import" button that loads such a file, so that I can restore a backup or move the History to another device.
44. As the user, I want Import to merge with the existing History by Entry ID and sort by time, so that nothing already on the device is lost.
45. As the user, I want importing the same file twice to change nothing, so that I can't create duplicates by accident.
46. As the user, I want an invalid or foreign file rejected with a short message and the History untouched, so that a wrong file can't corrupt my data.

### PWA, offline, platform

47. As the user, I want the layout to work on a phone screen and on a desktop, so that I can use it anywhere.
48. As the user, I want to install the app to my phone home screen, so that it opens like a native app.
49. As the user, I want the full History visible when offline, so that I can review past Entries without network.
50. As the user, I want the input line to show "offline" and send nothing while offline, so that I don't lose Words to failed requests.
51. As the user, I want the UI in English, so that there is no language selector to maintain.

### Maintainer

52. As the maintainer, I want the LLM call behind one small provider interface, so that I can swap Gemini for another provider without touching the rest of the app.
53. As the maintainer, I want the model ID in one place, so that switching models is a one-line change.
54. As the maintainer, I want the app deployed automatically to GitHub Pages on each push, so that publishing costs nothing and needs no manual steps.
55. As the maintainer, I want to re-run the Belarusian quality test when the prompt or model changes, so that quality regressions are caught before they reach me.

## Implementation Decisions

- **Stack**: Vite + vanilla TypeScript, no UI framework. `vite-plugin-pwa` for the service worker and manifest. Vitest for tests.
- **No backend** (ADR-0001). The browser calls the native Gemini `generateContent` endpoint directly with the key in the `x-goog-api-key` header (the OpenAI-compatible endpoint has CORS issues). The key lives in localStorage and is entered via a first-start screen / "⚙" settings.
- **Model**: `gemini-3.8-flash` on the free tier (ADR-0001). Accepted limits: ~5 requests/minute, ~20/day, occasional 503 "high demand", 3–13 s latency. Temperature 0, JSON structured output with a response schema.
- **Hosting**: GitHub Pages, public repository, deployed by a GitHub Action on push. `.env.local` (holds keys for the test script) must be git-ignored.

### Modules

- **Core (History + Entry logic)** — the one deep module and the test seam. Owns: submitting a Word, pending state per input cell, creating Entries, Language Mismatch and error outcomes, delete + Undo, Export/Import (merge by Entry ID, sort by time), offline gating. It depends only on two injected interfaces, so it is fully testable without a browser:
  - **Translator** (provider interface): `(Word, Source Language) → Translation | Language Mismatch | Error`, where Error distinguishes: invalid key, per-minute limit (with retry-after seconds if the API returns it), daily limit, provider busy, network/offline, malformed response.
  - **History storage**: load all Entries / save all Entries. Real implementation over localStorage; tests use an in-memory one.
- **Gemini Translator** — the only Gemini-specific code: builds the request (system prompt + schema), sends it, maps the HTTP result to the Translator outcomes. 429 responses must be split into per-minute vs daily limit using the quota metric in the error body; 503 maps to "busy".
- **Settings** — read/write the API key in localStorage; never part of the History or Export.
- **UI** — thin rendering of the table, input line, spinner, messages, "×"/Undo, "⚙", Export/Import buttons. All behaviour goes through the core.

### Data shapes

- **Entry**: `ID` (random unique string), `created_at` (ISO timestamp), `source_language` (`be` | `pl` | `en` | `ru`), `word` (as typed, trimmed), and translations for the other three Languages, each a list of 1–3 strings (Meanings).
- **Export file**: JSON object with a format marker and version, plus the list of Entries. No settings, no key. Import validates the marker, version and Entry shape before merging.

### Gemini prompt contract (from the Belarusian test prototype)

The prompt below came out of the test runs in `scripts/belarusian-test/` and encodes the decisions more precisely than prose; keep it (or its current version in that script) in sync with the app:

```
You are a dictionary for four languages: Belarusian (official modern Cyrillic orthography, not Taraškievica, not Łacinka), Polish, English, Russian.
The user gives a word or short phrase and states its source language.
1. Decide whether the input is a real word or phrase of the stated source language. If it is not (it belongs to another language, or is not a word at all), set "mismatch" to true and leave all translations empty. A word that is valid in the source language counts as valid even if it also exists in other languages.
2. Otherwise set "mismatch" to false and translate it into the other three languages. For each target language give exactly one translation per distinct meaning, most common first. Most words have one meaning, so give one translation. Give more (up to 3) only when the input is a homonym with clearly unrelated meanings. Never list synonyms of the same meaning. Give only the words: no stress marks, no grammar notes, no explanations. Use the dictionary base form.
Rules for every translation:
- It must be a real, existing word or phrase of the target language, written only in that language's script. If unsure, give fewer items rather than inventing a word.
- Never repeat the same word in one list.
- Leave the array for the source language empty.
```

User message: `Source language: <Language name>\nInput: <Word>`.
Response schema: `{ mismatch: boolean, be: string[], pl: string[], en: string[], ru: string[] }`, all required. The Gemini Translator must also defensively trim each list to 3 items and remove duplicates.

## Testing Decisions

- **Good tests** exercise external behaviour of the core through its public interface only: given a Translator answer and a starting History, what Entries, messages and pending states result. They must not assert on internal fields, call order, or storage format details beyond round-tripping.
- **One seam: the core.** Tested with Vitest using a fake Translator (scripted outcomes, including slow/pending ones) and an in-memory History storage. Cover: Entry added at top on success; Language Mismatch produces message and no Entry and keeps the Word; each error type produces its message and keeps the Word; no double submit while pending; repeated Word creates a new Entry; delete + Undo restores position; Undo expiry; offline blocks submission; History reloads from storage; Export excludes the key; Import merges by ID, sorts by time, is idempotent, and rejects invalid files without changes.
- **Gemini Translator**: no automated tests against the real API (free quota ~20/day). Quality is checked manually with the Belarusian test script (`scripts/belarusian-test/`, run with `node run.mjs gemini:<model> [words file]`) whenever the prompt or model changes.
- **UI**: no automated UI tests. Visual check by the agent through a browser tool (Playwright MCP or Claude in Chrome), at phone and desktop widths, plus a manual check by the user on the phone including PWA install.
- **Prior art**: none in the repo yet (greenfield); the Belarusian test script is the only existing code.

## Out of Scope

- Any backend, server database, accounts, login, or sync between devices.
- Automatic Source Language detection.
- Editing Entries; showing Entry time; search or filter in the History.
- Stress marks, grammar notes, examples, pronunciation, audio.
- Languages other than the four; Taraškievica or Łacinka Belarusian.
- Automatic retry, request queuing while offline, fallback to a second provider.
- Paid tier setup (it needs no code change; billing is enabled in Google AI Studio).
- Automated UI or end-to-end tests.
- UI localisation.

## Further Notes

- Glossary: `CONTEXT.md`. Decisions: ADR-0001 (no backend, Gemini key in browser, model choice) and ADR-0002 (History only in the browser, Export/Import).
- Known model behaviour from testing: 3.8 Flash got all tested Belarusian cells right but once treated "dom" in the English column as a real word ("dominant") instead of a Language Mismatch. Language Mismatch is best-effort, not guaranteed.
- The free-tier limits of Gemini are not published by Google and can change; the error messages must come from the actual API response, not hard-coded assumptions about the limit values.
