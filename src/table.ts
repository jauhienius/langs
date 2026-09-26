import { LANGUAGES, language_name, language_record, type LanguageCode } from "./language";
import { MEANINGS_MAX, type Meanings, type Translator } from "./translator";

export type Entry = {
    ID: string;
    created_at: string;
    source_language: LanguageCode;
    word: string;
    meanings: Meanings;
};

export type TableState = {
    entries: Entry[];
    words: Record<LanguageCode, string>;
    translations_pending: Record<LanguageCode, boolean>;
    message: string | null;
};

type TableListener = (state: TableState) => void;

// Cleans a provider answer: trimmed, no empty items, no duplicates, at most MEANINGS_MAX, nothing for the Source Language.
function meanings_clean(meanings: Meanings, source_language: LanguageCode): Meanings {
    const list_clean = (code: LanguageCode) => code === source_language ? [] : [...new Set(meanings[code].map(m /*meaning*/ => m.trim()).filter(m => m !== ""))].slice(0, MEANINGS_MAX);
    return language_record(list_clean);
}

const meanings_empty = (meanings: Meanings) => LANGUAGES.every(language => meanings[language.code].length === 0);

// The core: the History and the input line, independent of the UI and of the provider.
export class Table {
    state: TableState = { entries: [], words: language_record(() => ""), translations_pending: language_record(() => false), message: null };
    private listeners: TableListener[] = [];

    constructor(private translator: Translator) {}

    // Returns a function that removes the listener.
    subscribe(listener: TableListener) {
        this.listeners.push(listener);
        return () => { this.listeners = this.listeners.filter(l /*listener*/ => l !== listener); };
    }

    word_set(language: LanguageCode, word: string) {
        this.state_set({ words: { ...this.state.words, [language]: word } });
    }

    async submit(language: LanguageCode) {
        const word = this.state.words[language].trim();
        if (word === "") return;
        this.state_set({ translations_pending: { ...this.state.translations_pending, [language]: true } });
        const outcome = await this.translator.translate(word, language);
        const translations_pending = { ...this.state.translations_pending, [language]: false };
        if (outcome.kind === "mismatch") return this.state_set({ translations_pending, message: `"${word}" is not ${language_name(language)}` });
        if (outcome.kind === "error") return this.state_set({ translations_pending, message: outcome.message });
        const meanings = meanings_clean(outcome.meanings, language);
        if (meanings_empty(meanings)) return this.state_set({ translations_pending, message: `No translation found for "${word}"` });
        const entry: Entry = { ID: crypto.randomUUID(), created_at: new Date().toISOString(), source_language: language, word, meanings };
        this.state_set({ entries: [entry, ...this.state.entries], words: { ...this.state.words, [language]: "" }, translations_pending, message: null });
    }

    private state_set(state_change: Partial<TableState>) {
        this.state = { ...this.state, ...state_change };
        for (const listener of this.listeners) listener(this.state);
    }
}
