# No backend: the browser calls Gemini directly with a user-supplied key

The app is a single-user personal tool, so there is no server. The user pastes their own Gemini API key once; it is kept in the browser's localStorage and the page calls the native Gemini endpoint directly (it accepts browser/CORS calls). This keeps hosting purely static and free (GitHub Pages) and removes any public proxy that strangers could use to burn the quota.

## Considered Options

- **Serverless proxy holding the key (Cloudflare Worker)**: hides the key, but needs server code and protection of a public endpoint. Revisit only if the app ever gets more than one user.

## Consequences

- The key is visible to anyone with access to the browser profile; it is never included in an Export file.
- Only providers that accept direct browser calls can be used without reintroducing a backend. Gemini (native endpoint) and xAI Grok both do.
- Model: `gemini-3.8-flash` on the free tier. In the Belarusian test (`scripts/belarusian-test/`) the free Flash-Lite models invented or mistranslated Belarusian words in ~15% of Entries, and the errors varied between runs; 3.8 Flash got every Belarusian cell right. Its free limits (~5 requests/minute, ~20/day, occasional "high demand" errors, 3–13 s latency) are accepted for single-person use.
- Gemini is chosen for its free tier; Grok was tested for browser access but has no free credits. The LLM call sits behind a small provider interface (one function: Word + Source Language → translations or Language Mismatch) so the provider can be swapped without touching the rest of the app.
