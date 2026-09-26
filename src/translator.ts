import type { LanguageCode } from "./language";

// Most Words have one Meaning; homonyms have up to this many (see CONTEXT.md).
export const MEANINGS_MAX = 3;

// Translations of one Word: a list of Meanings per Language (empty for the Source Language).
export type Meanings = Record<LanguageCode, string[]>;

export type TranslatorOutcome =
    | { kind: "translation"; meanings: Meanings }
    | { kind: "mismatch" }
    | { kind: "error"; message: string };

// Provider interface (ADR-0001): the only thing the core knows about the LLM.
export interface Translator {
    translate(word: string, source_language: LanguageCode): Promise<TranslatorOutcome>;
}
