import type { LanguageCode } from "./language";

// Most Words have one Meaning; homonyms have up to this many (see CONTEXT.md).
export const MEANINGS_MAX = 3;

// Translations of one Word: a list of Meanings per Language (empty for the Source Language).
export type Meanings = Record<LanguageCode, string[]>;

// Why a translation failed; the core turns each type into a message for the user.
export type TranslatorError =
    | { type: "key_invalid" }
    | { type: "limit_minute"; retry_seconds: number | null }
    | { type: "limit_day" }
    | { type: "busy" }
    | { type: "network" }
    | { type: "response_bad" }
    | { type: "request_rejected"; status: number };

export type TranslatorOutcome =
    | { kind: "translation"; meanings: Meanings }
    | { kind: "mismatch" }
    | { kind: "error"; error: TranslatorError };

// Provider interface (ADR-0001): the only thing the core knows about the LLM.
export interface Translator {
    translate(word: string, source_language: LanguageCode): Promise<TranslatorOutcome>;
}
