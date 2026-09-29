import { HTTP_FORBIDDEN, HTTP_SERVER_ERROR, HTTP_TOO_MANY_REQUESTS, HTTP_UNAUTHORIZED } from "./http";
import type { LanguageCode } from "./language";
import type { Translator, TranslatorError, TranslatorOutcome } from "./translator";
import { ANSWER_PROPERTIES, PROMPT_SYSTEM, outcome_from_answer, prompt_user } from "./translator_prompt";

// Model choice: ADR-0003. Change here to switch models.
const OPENAI_MODEL = "gpt-6-sol";
// A dictionary lookup needs no long thinking; "none" keeps the answer fast and cheap.
const OPENAI_REASONING_EFFORT = "none";
const OPENAI_URL = "https://api.openai.com/v1/chat/completions";

const SCHEMA = {
    type: "object",
    properties: Object.fromEntries(ANSWER_PROPERTIES.map(p /*property*/ => [p, p === "mismatch" ? { type: "boolean" } : { type: "array", items: { type: "string" } }])),
    required: ANSWER_PROPERTIES,
    additionalProperties: false,
};

const MS_PER_SECOND = 1000;

// Wait time from the message, e.g. "Please try again in 20s" or "Please try again in 820ms".
function retry_seconds_find(body: any): number | null {
    const match = String(body?.error?.message ?? "").match(/try again in ([\d.]+)(ms|s)/i);
    if (!match) return null;
    const seconds = Number.parseFloat(match[1]) / (match[2].toLowerCase() === "ms" ? MS_PER_SECOND : 1);
    return Number.isFinite(seconds) ? Math.ceil(seconds) : null;
}

// OpenAI answers 429 both for rate limits and for an account without credit ("insufficient_quota").
function error_from_response(status: number, body: any): TranslatorError {
    const message = String(body?.error?.message ?? "");
    if (status === HTTP_TOO_MANY_REQUESTS && body?.error?.code === "insufficient_quota") return { type: "credit_empty" };
    if (status === HTTP_TOO_MANY_REQUESTS) return /per day/i.test(message) ? { type: "limit_day" } : { type: "limit_minute", retry_seconds: retry_seconds_find(body) };
    if (status === HTTP_UNAUTHORIZED || status === HTTP_FORBIDDEN) return { type: "key_invalid" };
    if (status >= HTTP_SERVER_ERROR) return { type: "busy" };
    return { type: "request_rejected", status };
}

export class TranslatorOpenAI implements Translator {
    // The key is read on each call, so a key changed in "⚙" is used at once.
    constructor(private key_get: () => string) {}

    async translate(word: string, source_language: LanguageCode): Promise<TranslatorOutcome> {
        const request = {
            model: OPENAI_MODEL,
            reasoning_effort: OPENAI_REASONING_EFFORT,
            messages: [{ role: "developer", content: PROMPT_SYSTEM }, { role: "user", content: prompt_user(word, source_language) }],
            response_format: { type: "json_schema", json_schema: { name: "entry", strict: true, schema: SCHEMA } },
        };
        let response: Response;
        // OpenAI error answers (e.g. 401 for a bad key) have no CORS header, so the browser shows them as a network error.
        try { response = await fetch(OPENAI_URL, { method: "POST", headers: { authorization: `Bearer ${this.key_get()}`, "content-type": "application/json" }, body: JSON.stringify(request) }); }
        catch { return { kind: "error", error: { type: "network_or_key" } }; }

        const body = await response.json().catch(() => null);
        if (!response.ok) return { kind: "error", error: error_from_response(response.status, body) };
        return outcome_from_answer(body?.choices?.[0]?.message?.content ?? "");
    }
}
