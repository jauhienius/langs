import { LANGUAGES, language_name, language_record, type LanguageCode } from "./language";
import { MEANINGS_MAX, type Meanings, type TranslatorOutcome } from "./translator";

// Prompt from the Belarusian test (scripts/belarusian-test/run.mjs); keep both in sync. Same for every provider.
export const PROMPT_SYSTEM = `You are a dictionary for four languages: Belarusian (official modern Cyrillic orthography, not Taraškievica, not Łacinka), Polish, English, Russian.
The user gives a word or short phrase and states its source language.
1. Decide whether the input is a real word or phrase of the stated source language. If it is not (it belongs to another language, or is not a word at all), set "mismatch" to true and leave all translations empty. A word that is valid in the source language counts as valid even if it also exists in other languages.
2. Otherwise set "mismatch" to false and translate it into the other three languages. For each target language give exactly one translation per distinct meaning, most common first. Most words have one meaning, so give one translation. Give more (up to ${MEANINGS_MAX}) only when the input is a homonym with clearly unrelated meanings (e.g. "bank": financial institution / river bank). Never list synonyms of the same meaning. Give only the words: no stress marks, no grammar notes, no explanations. Use the dictionary base form.
Rules for every translation:
- It must be a real, existing word or phrase of the target language, written only in that language's script. If unsure, give fewer items rather than inventing a word.
- Never repeat the same word in one list. If several meanings share one spelling in the target language, list that spelling once.
- Leave the array for the source language empty.`;

const LANGUAGE_NAMES = language_record(code => code === "be" ? "Belarusian (official Cyrillic orthography)" : language_name(code));

export const prompt_user = (word: string, source_language: LanguageCode) => `Source language: ${LANGUAGE_NAMES[source_language]}\nInput: ${word}`;

// Properties of the JSON answer; each provider writes them in its own schema dialect.
export const ANSWER_PROPERTIES = ["mismatch", ...LANGUAGES.map(language => language.code)];

type Answer = { mismatch: boolean } & Meanings;

const answer_valid = (answer: unknown): answer is Answer => typeof answer === "object" && answer !== null && typeof (answer as Answer).mismatch === "boolean" && LANGUAGES.every(language => Array.isArray((answer as Answer)[language.code]));

// Turns the JSON text of a provider answer into a Translator outcome.
export function outcome_from_answer(text: string): TranslatorOutcome {
    let answer: unknown;
    try { answer = JSON.parse(text); }
    catch { answer = null; }
    if (!answer_valid(answer)) return { kind: "error", error: { type: "response_bad" } };
    if (answer.mismatch) return { kind: "mismatch" };
    const { mismatch: _, ...meanings } = answer;
    return { kind: "translation", meanings };
}
