# OpenAI as a second, paid provider next to free Gemini

The free Gemini tier (ADR-0001) allows only ~20 Entries per day. The user has a paid OpenAI account with a small prepaid credit, so the app also offers OpenAI. The user chooses the provider in "⚙"; each provider has its own key in localStorage. Gemini stays the default, so a key saved before this decision keeps working. There is still no backend: `api.openai.com` accepts browser calls (CORS preflight allows any origin, including GitHub Pages).

## Considered Options

- **Replace Gemini with OpenAI**: rejected; the free Gemini tier stays useful when the credit is used up.
- **Automatic fallback between providers**: rejected; ticket 03 says the app never falls back to another provider, and a silent switch would spend money without the user's choice.

## Consequences

- Model: `gpt-6-sol` ($2 / $10 per 1M input / output tokens) with `reasoning_effort: "none"`. One Entry uses ~400 input and ~70 output tokens, so it costs ~$0.0015 and a $5 credit is enough for ~3,300 Entries; latency ~2 s. In the Belarusian test (`scripts/belarusian-test/report-openai-*.md`) it got the Belarusian cells right (e.g. урач, калі ласка, сям'я, добры дзень). The cheaper `gpt-6-luna` ($0.10 / $0.50) left four Belarusian cells empty and wrote a stress mark with `reasoning_effort: "none"`; with `"low"` it filled them but invented or mistranslated words (батог for "bat", дамінант for "dom"). Both OpenAI models do not report English "dom" as a Language Mismatch.
- OpenAI error answers (401, and possibly 429) have no CORS header, so the browser cannot read them. A failed OpenAI call therefore shows "check the connection, and the API key" instead of a precise message.
- An account with no credit left (`insufficient_quota`) has its own message.
