import { LANGUAGES, language_name, language_record, type LanguageCode } from "./language";
import { MEANINGS_MAX, type Meanings, type Translator, type TranslatorOutcome } from "./translator";

// Model choice: ADR-0001. Change here to switch models.
const GEMINI_MODEL = "gemini-3.8-flash";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

// Prompt from the Belarusian test (scripts/belarusian-test/run.mjs); keep both in sync.
const PROMPT_SYSTEM = `You are a dictionary for four languages: Belarusian (official modern Cyrillic orthography, not Taraškievica, not Łacinka), Polish, English, Russian.
The user gives a word or short phrase and states its source language.
1. Decide whether the input is a real word or phrase of the stated source language. If it is not (it belongs to another language, or is not a word at all), set "mismatch" to true and leave all translations empty. A word that is valid in the source language counts as valid even if it also exists in other languages.
2. Otherwise set "mismatch" to false and translate it into the other three languages. For each target language give exactly one translation per distinct meaning, most common first. Most words have one meaning, so give one translation. Give more (up to ${MEANINGS_MAX}) only when the input is a homonym with clearly unrelated meanings (e.g. "bank": financial institution / river bank). Never list synonyms of the same meaning. Give only the words: no stress marks, no grammar notes, no explanations. Use the dictionary base form.
Rules for every translation:
- It must be a real, existing word or phrase of the target language, written only in that language's script. If unsure, give fewer items rather than inventing a word.
- Never repeat the same word in one list. If several meanings share one spelling in the target language, list that spelling once.
- Leave the array for the source language empty.`;

const LANGUAGE_NAMES = language_record(code => code === "be" ? "Belarusian (official Cyrillic orthography)" : language_name(code));

const SCHEMA_PROPERTIES = ["mismatch", ...LANGUAGES.map(language => language.code)];
const SCHEMA = {
    type: "OBJECT",
    properties: Object.fromEntries(SCHEMA_PROPERTIES.map(p /*property*/ => [p, p === "mismatch" ? { type: "BOOLEAN" } : { type: "ARRAY", items: { type: "STRING" } }])),
    required: SCHEMA_PROPERTIES,
    propertyOrdering: SCHEMA_PROPERTIES,
};

type GeminiAnswer = { mismatch: boolean } & Meanings;

const answer_valid = (answer: unknown): answer is GeminiAnswer => typeof answer === "object" && answer !== null && typeof (answer as GeminiAnswer).mismatch === "boolean" && LANGUAGES.every(language => Array.isArray((answer as GeminiAnswer)[language.code]));

export class TranslatorGemini implements Translator {
    // The key is read on each call, so a key changed in "⚙" is used at once.
    constructor(private key_get: () => string) {}

    async translate(word: string, source_language: LanguageCode): Promise<TranslatorOutcome> {
        const request = {
            systemInstruction: { parts: [{ text: PROMPT_SYSTEM }] },
            contents: [{ role: "user", parts: [{ text: `Source language: ${LANGUAGE_NAMES[source_language]}\nInput: ${word}` }] }],
            generationConfig: { temperature: 0, responseMimeType: "application/json", responseSchema: SCHEMA },
        };
        let response: Response;
        try { response = await fetch(GEMINI_URL, { method: "POST", headers: { "x-goog-api-key": this.key_get(), "content-type": "application/json" }, body: JSON.stringify(request) }); }
        catch { return { kind: "error", message: "Network error – check the connection and try again" }; }

        const body = await response.json().catch(() => null);
        if (!response.ok) return { kind: "error", message: `Gemini error ${response.status}: ${body?.error?.message ?? response.statusText}` };

        let answer: unknown;
        try { answer = JSON.parse(body?.candidates?.[0]?.content?.parts?.[0]?.text ?? ""); }
        catch { answer = null; }
        if (!answer_valid(answer)) return { kind: "error", message: "Gemini gave an answer in an unknown format – try again" };
        if (answer.mismatch) return { kind: "mismatch" };
        const { mismatch: _, ...meanings } = answer;
        return { kind: "translation", meanings };
    }
}
