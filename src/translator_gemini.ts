import { HTTP_FORBIDDEN, HTTP_SERVER_ERROR, HTTP_TOO_MANY_REQUESTS, HTTP_UNAUTHORIZED } from "./http";
import type { LanguageCode } from "./language";
import type { Translator, TranslatorError, TranslatorOutcome } from "./translator";
import { ANSWER_PROPERTIES, PROMPT_SYSTEM, outcome_from_answer, prompt_user } from "./translator_prompt";

// Model choice: ADR-0001. Change here to switch models.
const GEMINI_MODEL = "gemini-3.8-flash";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

const SCHEMA = {
    type: "OBJECT",
    properties: Object.fromEntries(ANSWER_PROPERTIES.map(p /*property*/ => [p, p === "mismatch" ? { type: "BOOLEAN" } : { type: "ARRAY", items: { type: "STRING" } }])),
    required: ANSWER_PROPERTIES,
    propertyOrdering: ANSWER_PROPERTIES,
};

// Wait time from the RetryInfo detail ("31.6s"), else from the message ("retry in 31.6s").
function retry_seconds_find(body: any): number | null {
    const retry_info = body?.error?.details?.find((d /*detail*/: any) => String(d?.["@type"]).endsWith("RetryInfo"));
    const delay = retry_info?.retryDelay ?? String(body?.error?.message ?? "").match(/retry in ([\d.]+)s/i)?.[1];
    const seconds = Number.parseFloat(String(delay));
    return Number.isFinite(seconds) ? Math.ceil(seconds) : null;
}

// Gemini free-tier quota IDs name the period, e.g. "GenerateRequestsPerDayPerProjectPerModel-FreeTier".
function error_from_response(status: number, body: any): TranslatorError {
    const body_text = JSON.stringify(body ?? {});
    if (status === HTTP_TOO_MANY_REQUESTS) return body_text.includes("PerDay") ? { type: "limit_day" } : { type: "limit_minute", retry_seconds: retry_seconds_find(body) };
    if (status === HTTP_UNAUTHORIZED || status === HTTP_FORBIDDEN || body_text.includes("API_KEY_INVALID")) return { type: "key_invalid" };
    if (status >= HTTP_SERVER_ERROR) return { type: "busy" };
    return { type: "request_rejected", status };
}

export class TranslatorGemini implements Translator {
    // The key is read on each call, so a key changed in "⚙" is used at once.
    constructor(private key_get: () => string) {}

    async translate(word: string, source_language: LanguageCode): Promise<TranslatorOutcome> {
        const request = {
            systemInstruction: { parts: [{ text: PROMPT_SYSTEM }] },
            contents: [{ role: "user", parts: [{ text: prompt_user(word, source_language) }] }],
            generationConfig: { temperature: 0, responseMimeType: "application/json", responseSchema: SCHEMA },
        };
        let response: Response;
        try { response = await fetch(GEMINI_URL, { method: "POST", headers: { "x-goog-api-key": this.key_get(), "content-type": "application/json" }, body: JSON.stringify(request) }); }
        catch { return { kind: "error", error: { type: "network" } }; }

        const body = await response.json().catch(() => null);
        if (!response.ok) return { kind: "error", error: error_from_response(response.status, body) };
        return outcome_from_answer(body?.candidates?.[0]?.content?.parts?.[0]?.text ?? "");
    }
}
