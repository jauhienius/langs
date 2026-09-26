import { entry_valid, type Entry, type HistoryStorage } from "./table";

// The History in this browser's localStorage (ADR-0002).
export const HISTORY_STORAGE_NAME = "langs.history";
const HISTORY_CORRUPT_STORAGE_PREFIX = "langs.history.corrupt.";
const HISTORY_VERSION = 1;

type HistoryRecord = { version: number; entries: Entry[] };

const history_record_valid = (value: unknown): value is HistoryRecord => (value as HistoryRecord)?.version === HISTORY_VERSION && Array.isArray((value as HistoryRecord).entries) && (value as HistoryRecord).entries.every(entry_valid);

// True when stored data could not be read and could not be backed up: saving then stops, so the data is never overwritten.
let history_blocked = false;

function history_parse(text: string): unknown {
    try { return JSON.parse(text); }
    catch { return null; }
}

export const HistoryLocalStorage: HistoryStorage = {
    load: () => {
        const text = localStorage.getItem(HISTORY_STORAGE_NAME);
        if (text === null) return [];
        const history = history_parse(text);
        if (history_record_valid(history)) return history.entries;
        // Unreadable data (bad JSON, other version, bad Entry) is moved aside under a new name each time.
        try { localStorage.setItem(`${HISTORY_CORRUPT_STORAGE_PREFIX}${new Date().toISOString()}`, text); }
        catch { history_blocked = true; }
        return [];
    },
    save: entries => {
        if (history_blocked) throw new Error("History storage blocked: unreadable data could not be backed up");
        localStorage.setItem(HISTORY_STORAGE_NAME, JSON.stringify({ version: HISTORY_VERSION, entries } satisfies HistoryRecord));
    },
};
