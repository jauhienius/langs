# 08: OpenAI as a paid provider

**What to build:** In "⚙" the user chooses the provider (Gemini free / OpenAI paid) and enters the key of that provider. Each provider keeps its own key. Translations go to the chosen provider with the same prompt and the same JSON answer. See ADR-0003.

**Blocked by:** 03

**Status:** in progress

- [x] Shared prompt and answer check for all providers (`src/translator_prompt.ts`)
- [x] OpenAI Translator: Chat Completions, strict JSON schema, `reasoning_effort: "none"`; maps 401/403, 429 (per minute / per day / no credit), 5xx, other statuses
- [x] Provider choice and one key per provider in "⚙"; an old Gemini key stays valid and Gemini is the default
- [x] Core tests for the new error messages and for the old Gemini key
- [x] OpenAI added to the Belarusian test script
- [x] Browser check: the key screen shows the provider choice; a bad OpenAI key shows "No answer – check the connection, and the API key in ⚙"
- [x] Belarusian test with the real OpenAI key; final model choice in ADR-0003 (`gpt-6-sol`)
- [x] A successful OpenAI answer has `Access-Control-Allow-Origin: *` (checked with curl and the real key, Origin = GitHub Pages)
- [ ] Live check on the phone: choose OpenAI in "⚙", enter the key, translate one Word

## Comments

- OpenAI error answers have no `Access-Control-Allow-Origin` header (checked with curl on a 401), so the browser gets them as a network error. The preflight allows every origin.
