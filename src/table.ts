import { LANGUAGES, language_name, language_record, type LanguageCode } from "./language";
import { json_parse } from "./json";
import { MEANINGS_MAX, type Meanings, type Translator, type TranslatorError } from "./translator";

export type Entry = {
    ID: string;
    created_at: string;
    source_language: LanguageCode;
    word: string;
    meanings: Meanings;
};

// How long Undo stays available after a delete.
export const UNDO_DURATION_MS = 5000;

// The last deleted Entry, the ID of the Entry that was below it (null: it was the last one) and its index as a fallback.
export type Deletion = { entry: Entry; ID_next: string | null; index: number };

export type TableState = {
    entries: Entry[];
    words: Record<LanguageCode, string>;
    translations_pending: Record<LanguageCode, boolean>;
    message: string | null;
    deletion: Deletion | null;
    network: Network;
};

export type Network = "online" | "offline";

type TableListener = (state: TableState) => void;

// Where the History lives between sessions (ADR-0002); Entries are stored newest first.
export interface HistoryStorage {
    load(): Entry[];
    save(entries: Entry[]): void;
}

// Cleans a provider answer: trimmed, no empty items, no duplicates, at most MEANINGS_MAX, nothing for the Source Language.
function meanings_clean(meanings: Meanings, source_language: LanguageCode): Meanings {
    const list_clean = (code: LanguageCode) => code === source_language ? [] : [...new Set(meanings[code].map(m /*meaning*/ => m.trim()).filter(m => m !== ""))].slice(0, MEANINGS_MAX);
    return language_record(list_clean);
}

function error_message(error: TranslatorError) {
    switch (error.type) {
        case "key_invalid": return "The API key was rejected – check it in ⚙";
        case "limit_minute": return `Limit per minute reached – try again in ${error.retry_seconds === null ? "a minute" : `${error.retry_seconds} s`}`;
        case "limit_day": return "Daily limit reached – try again tomorrow";
        case "credit_empty": return "The API account has no credit left – add credit to it";
        case "busy": return "The translation service is busy – try again";
        case "network": return "Network error – check the connection and try again";
        case "network_or_key": return "No answer – check the connection, and the API key in ⚙";
        case "response_bad": return "The answer had an unknown format – try again";
        case "request_rejected": return `The request was rejected (HTTP ${error.status}) – trying again will not help`;
    }
}

const language_codes: readonly string[] = LANGUAGES.map(language => language.code);
const strings_valid = (value: unknown) => Array.isArray(value) && value.every(item => typeof item === "string");

// Checks the shape of an Entry that comes from outside the app (stored History, Import file).
export function entry_valid(value: unknown): value is Entry {
    const entry = value as Entry;
    if (typeof value !== "object" || value === null) return false;
    if (typeof entry.ID !== "string" || typeof entry.word !== "string" || Number.isNaN(Date.parse(entry.created_at))) return false;
    if (!language_codes.includes(entry.source_language) || typeof entry.meanings !== "object" || entry.meanings === null) return false;
    return LANGUAGES.every(language => strings_valid(entry.meanings[language.code]));
}

// Export file (ADR-0002): a format marker, a version and the Entries; never settings or the API key.
export const EXPORT_FORMAT = "langs-history";
const EXPORT_VERSION = 1;
const EXPORT_INDENT = 2;

type ExportFile = { format: string; version: number; entries: Entry[] };

function export_file_valid(value: unknown): value is ExportFile {
    const file = value as ExportFile | null;
    return file?.format === EXPORT_FORMAT && file.version === EXPORT_VERSION && Array.isArray(file.entries) && file.entries.every(entry_valid);
}

const entries_sort = (entries: Entry[]) => [...entries].sort((a /*entry*/, b /*entry*/) => Date.parse(b.created_at) - Date.parse(a.created_at));

const meanings_empty = (meanings: Meanings) => LANGUAGES.every(language => meanings[language.code].length === 0);

// The core: the History and the input line, independent of the UI and of the provider.
export class Table {
    state: TableState;
    private listeners: TableListener[] = [];
    private undo_timer: ReturnType<typeof setTimeout> | undefined;

    constructor(private translator: Translator, private storage: HistoryStorage) { this.state = { entries: storage.load(), words: language_record(() => ""), translations_pending: language_record(() => false), message: null, deletion: null, network: "online" }; }

    // Returns a function that removes the listener.
    subscribe(listener: TableListener) {
        this.listeners.push(listener);
        return () => { this.listeners = this.listeners.filter(l /*listener*/ => l !== listener); };
    }

    // While offline nothing is sent and nothing is queued (the input line shows "offline").
    network_set(network: Network) { this.state_set({ network }); }

    history_reload() { this.state_set({ entries: this.storage.load() }); }

    // Deletes at once; Undo stays available for UNDO_DURATION_MS, and a second delete makes the first one final.
    entry_delete(ID: string) {
        const index = this.state.entries.findIndex(entry => entry.ID === ID);
        if (index < 0) return;
        const entries = this.state.entries.filter(entry => entry.ID !== ID);
        const deletion: Deletion = { entry: this.state.entries[index], ID_next: this.state.entries[index + 1]?.ID ?? null, index };
        clearTimeout(this.undo_timer);
        this.undo_timer = setTimeout(() => this.state_set({ deletion: null }), UNDO_DURATION_MS);
        this.state_set({ entries, deletion, message: this.history_save(entries) ?? this.state.message });
    }

    undo() {
        const deletion = this.state.deletion;
        if (deletion === null) return;
        clearTimeout(this.undo_timer);
        if (this.state.entries.some(entry => entry.ID === deletion.entry.ID)) return this.state_set({ deletion: null });
        const index_next = this.state.entries.findIndex(entry => entry.ID === deletion.ID_next);
        const index = index_next < 0 ? Math.min(deletion.index, this.state.entries.length) : index_next;
        const entries = [...this.state.entries.slice(0, index), deletion.entry, ...this.state.entries.slice(index)];
        this.state_set({ entries, deletion: null, message: this.history_save(entries) ?? this.state.message });
    }

    history_export() { return JSON.stringify({ format: EXPORT_FORMAT, version: EXPORT_VERSION, entries: this.state.entries } satisfies ExportFile, null, EXPORT_INDENT); }

    // Merges an Export file by Entry ID: an ID already on this device keeps the local Entry. A file that is not valid changes nothing.
    history_import(text: string) {
        const file = json_parse(text);
        if (!export_file_valid(file)) return this.state_set({ message: "This file is not a Langs History export – nothing was changed" });
        const IDs = new Set(this.state.entries.map(entry => entry.ID));
        const entries_new: Entry[] = [];
        for (const entry of file.entries) {
            if (IDs.has(entry.ID)) continue;
            IDs.add(entry.ID);
            entries_new.push(entry);
        }
        const count_text = `Imported ${entries_new.length} new ${entries_new.length === 1 ? "Entry" : "Entries"}`;
        if (entries_new.length === 0) return this.state_set({ message: count_text });
        const entries = entries_sort([...this.state.entries, ...entries_new]);
        this.state_set({ entries, message: this.history_save(entries) ?? count_text });
    }

    word_set(language: LanguageCode, word: string) {
        this.state_set({ words: { ...this.state.words, [language]: word } });
    }

    async submit(language: LanguageCode) {
        const word = this.state.words[language].trim();
        if (word === "" || this.state.translations_pending[language] || this.state.network === "offline") return;
        this.state_set({ translations_pending: { ...this.state.translations_pending, [language]: true } });
        const outcome = await this.translator.translate(word, language);
        const translations_pending = { ...this.state.translations_pending, [language]: false };
        if (outcome.kind === "mismatch") return this.state_set({ translations_pending, message: `"${word}" is not ${language_name(language)}` });
        if (outcome.kind === "error") return this.state_set({ translations_pending, message: error_message(outcome.error) });
        const meanings = meanings_clean(outcome.meanings, language);
        if (meanings_empty(meanings)) return this.state_set({ translations_pending, message: `No translation found for "${word}"` });
        const entry: Entry = { ID: crypto.randomUUID(), created_at: new Date().toISOString(), source_language: language, word, meanings };
        const entries = [entry, ...this.state.entries];
        this.state_set({ entries, words: { ...this.state.words, [language]: "" }, translations_pending, message: this.history_save(entries) });
    }

    // Returns a message when the History could not be saved, else null.
    private history_save(entries: Entry[]) {
        try { this.storage.save(entries); return null; }
        catch { return "The History could not be saved on this device – use Export to keep it"; }
    }

    private state_set(state_change: Partial<TableState>) {
        this.state = { ...this.state, ...state_change };
        for (const listener of this.listeners) listener(this.state);
    }
}
