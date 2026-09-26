import { afterEach, describe, expect, it, vi } from "vitest";
import { Table, UNDO_DURATION_MS, entry_valid, type Entry, type HistoryStorage } from "./table";
import type { Translator, TranslatorError, TranslatorOutcome } from "./translator";

// Fake Translator: answers with a scripted outcome and records each call.
function translator_fake(outcome: TranslatorOutcome) {
    const calls: { word: string; source_language: string }[] = [];
    const translator: Translator = {
        translate: async (word, source_language) => {
            calls.push({ word, source_language });
            return outcome;
        },
    };
    return { translator, calls };
}

// In-memory History storage: survives a new Table like localStorage survives a reload.
function history_storage_fake(entries_initial: Entry[] = []) {
    let entries = entries_initial;
    const storage: HistoryStorage = { load: () => entries, save: entries_new => { entries = entries_new; } };
    return storage;
}

const ENTRY_TIME = "2026-09-27T10:00:00.000Z";
const RETRY_SECONDS = 31;
const HTTP_NOT_FOUND = 404;

const TRANSLATION_DOM: TranslatorOutcome = { kind: "translation", meanings: { be: ["дом"], pl: [], en: ["house", "home"], ru: ["дом"] } };

describe("Table", () => {
    it("adds an Entry with the Word and its translations at the top after a successful translation", async () => {
        const { translator } = translator_fake(TRANSLATION_DOM);
        const table = new Table(translator, history_storage_fake());

        table.word_set("pl", "dom");
        await table.submit("pl");

        expect(table.state.entries).toHaveLength(1);
        const entry = table.state.entries[0];
        expect(entry.source_language).toBe("pl");
        expect(entry.word).toBe("dom");
        expect(entry.meanings).toEqual({ be: ["дом"], pl: [], en: ["house", "home"], ru: ["дом"] });
        expect(entry.ID).not.toBe("");
    });

    it("clears the input cell after a successful translation and puts the newest Entry first", async () => {
        const { translator } = translator_fake(TRANSLATION_DOM);
        const table = new Table(translator, history_storage_fake());

        table.word_set("pl", "dom");
        await table.submit("pl");
        table.word_set("ru", "дом");
        await table.submit("ru");

        expect(table.state.words.pl).toBe("");
        expect(table.state.entries.map(entry => entry.word)).toEqual(["дом", "dom"]);
    });

    it("reports a Language Mismatch with a message, adds no Entry and keeps the Word in its cell", async () => {
        const { translator } = translator_fake({ kind: "mismatch" });
        const table = new Table(translator, history_storage_fake());

        table.word_set("en", "dom");
        await table.submit("en");

        expect(table.state.entries).toEqual([]);
        expect(table.state.message).toBe('"dom" is not English');
        expect(table.state.words.en).toBe("dom");
    });

    it("removes the message after the next successful translation", async () => {
        const outcomes: TranslatorOutcome[] = [{ kind: "mismatch" }, TRANSLATION_DOM];
        const table = new Table({ translate: async () => outcomes.shift()! }, history_storage_fake());

        table.word_set("en", "dom");
        await table.submit("en");
        table.word_set("pl", "dom");
        await table.submit("pl");

        expect(table.state.message).toBeNull();
    });

    it("sends the Word without leading and trailing spaces", async () => {
        const { translator, calls } = translator_fake(TRANSLATION_DOM);
        const table = new Table(translator, history_storage_fake());

        table.word_set("pl", "  dzień dobry ");
        await table.submit("pl");

        expect(calls).toEqual([{ word: "dzień dobry", source_language: "pl" }]);
        expect(table.state.entries[0].word).toBe("dzień dobry");
    });

    it("does nothing when the cell is empty or has only spaces", async () => {
        const { translator, calls } = translator_fake(TRANSLATION_DOM);
        const table = new Table(translator, history_storage_fake());

        await table.submit("en");
        table.word_set("en", "   ");
        await table.submit("en");

        expect(calls).toEqual([]);
        expect(table.state.entries).toEqual([]);
    });

    it("marks the cell as pending while the translation runs and tells listeners about each change", async () => {
        let answer: (outcome: TranslatorOutcome) => void = () => {};
        const table = new Table({ translate: () => new Promise(resolve => { answer = resolve; }) }, history_storage_fake());
        const translations_pending_log: boolean[] = [];
        table.subscribe(state => translations_pending_log.push(state.translations_pending.pl));

        table.word_set("pl", "dom");
        const submission = table.submit("pl");
        expect(table.state.translations_pending.pl).toBe(true);
        expect(table.state.translations_pending.en).toBe(false);

        answer(TRANSLATION_DOM);
        await submission;
        expect(table.state.translations_pending.pl).toBe(false);
        expect(translations_pending_log).toEqual([false, true, false]);
    });

    it("keeps at most three different Meanings per cell and nothing in the Source Language cell", async () => {
        const meanings = { be: ["каса", " каса ", "", "каса"], pl: ["kosa", "warkocz", "mierzeja", "kosa", "szczotka"], en: ["scythe"], ru: ["коса"] };
        const { translator } = translator_fake({ kind: "translation", meanings });
        const table = new Table(translator, history_storage_fake());

        table.word_set("ru", "коса");
        await table.submit("ru");

        expect(table.state.entries[0].meanings).toEqual({ be: ["каса"], pl: ["kosa", "warkocz", "mierzeja"], en: ["scythe"], ru: [] });
    });

    it("adds no Entry and keeps the Word when the translation has no Meaning in any Language", async () => {
        const { translator } = translator_fake({ kind: "translation", meanings: { be: [], pl: ["dom"], en: [" "], ru: [] } });
        const table = new Table(translator, history_storage_fake());

        table.word_set("pl", "dom");
        await table.submit("pl");

        expect(table.state.entries).toEqual([]);
        expect(table.state.message).toBe('No translation found for "dom"');
        expect(table.state.words.pl).toBe("dom");
    });

    it.each<[string, TranslatorError, string]>([
        ["an invalid key", { type: "key_invalid" }, "The API key was rejected – check it in ⚙"],
        ["the per-minute limit with a wait time", { type: "limit_minute", retry_seconds: RETRY_SECONDS }, `Limit per minute reached – try again in ${RETRY_SECONDS} s`],
        ["the per-minute limit without a wait time", { type: "limit_minute", retry_seconds: null }, "Limit per minute reached – try again in a minute"],
        ["the daily limit", { type: "limit_day" }, "Daily limit reached – try again tomorrow"],
        ["a busy provider", { type: "busy" }, "The translation service is busy – try again"],
        ["a network error", { type: "network" }, "Network error – check the connection and try again"],
        ["a bad response", { type: "response_bad" }, "The answer had an unknown format – try again"],
        ["a rejected request", { type: "request_rejected", status: HTTP_NOT_FOUND }, `The request was rejected (HTTP ${HTTP_NOT_FOUND}) – trying again will not help`],
    ])("reports %s with its message, adds no Entry and keeps the Word", async (_, error, message) => {
        const { translator } = translator_fake({ kind: "error", error });
        const table = new Table(translator, history_storage_fake());

        table.word_set("pl", "dom");
        await table.submit("pl");

        expect(table.state.message).toBe(message);
        expect(table.state.entries).toEqual([]);
        expect(table.state.words.pl).toBe("dom");
        expect(table.state.translations_pending.pl).toBe(false);
    });

    it("does not send the same cell again while its translation is pending", async () => {
        let answer: (outcome: TranslatorOutcome) => void = () => {};
        let calls = 0;
        const table = new Table({ translate: () => { calls++; return new Promise(resolve => { answer = resolve; }); } }, history_storage_fake());

        table.word_set("pl", "dom");
        const submission = table.submit("pl");
        await table.submit("pl");
        answer(TRANSLATION_DOM);
        await submission;

        expect(calls).toBe(1);
        expect(table.state.entries).toHaveLength(1);
    });

    it("keeps the History after a reload, newest first", async () => {
        const { translator } = translator_fake(TRANSLATION_DOM);
        const storage = history_storage_fake();
        const table = new Table(translator, storage);

        table.word_set("pl", "dom");
        await table.submit("pl");
        table.word_set("ru", "дом");
        await table.submit("ru");
        const table_reloaded = new Table(translator, storage);

        expect(table_reloaded.state.entries.map(entry => entry.word)).toEqual(["дом", "dom"]);
        expect(table_reloaded.state.entries).toEqual(table.state.entries);
    });

    it("adds a new Entry when the same Word is translated again", async () => {
        const { translator } = translator_fake(TRANSLATION_DOM);
        const table = new Table(translator, history_storage_fake());

        table.word_set("pl", "dom");
        await table.submit("pl");
        table.word_set("pl", "dom");
        await table.submit("pl");

        expect(table.state.entries.map(entry => entry.word)).toEqual(["dom", "dom"]);
        expect(new Set(table.state.entries.map(entry => entry.ID)).size).toBe(table.state.entries.length);
    });

    it("records when each Entry was added", async () => {
        const { translator } = translator_fake(TRANSLATION_DOM);
        const table = new Table(translator, history_storage_fake());
        const time_before = Date.now();

        table.word_set("pl", "dom");
        await table.submit("pl");

        const created_at = Date.parse(table.state.entries[0].created_at);
        expect(created_at).toBeGreaterThanOrEqual(time_before);
        expect(created_at).toBeLessThanOrEqual(Date.now());
    });

    it("keeps the new Entry on screen and reports it when the History cannot be saved", async () => {
        const { translator } = translator_fake(TRANSLATION_DOM);
        const storage: HistoryStorage = { load: () => [], save: () => { throw new Error("QuotaExceededError"); } };
        const table = new Table(translator, storage);

        table.word_set("pl", "dom");
        await table.submit("pl");

        expect(table.state.entries.map(entry => entry.word)).toEqual(["dom"]);
        expect(table.state.message).toBe("The History could not be saved on this device – use Export to keep it");
        expect(table.state.translations_pending.pl).toBe(false);
    });

    it("loads the History again when it was changed outside this Table (another tab)", async () => {
        const { translator } = translator_fake(TRANSLATION_DOM);
        const storage = history_storage_fake();
        const table = new Table(translator, storage);
        const table_other = new Table(translator, storage);

        table_other.word_set("pl", "dom");
        await table_other.submit("pl");
        table.history_reload();

        expect(table.state.entries).toEqual(table_other.state.entries);
    });

    it("accepts only Entries with the full shape", () => {
        const entry: Entry = { ID: "a", created_at: ENTRY_TIME, source_language: "pl", word: "dom", meanings: { be: ["дом"], pl: [], en: ["house"], ru: ["дом"] } };

        expect(entry_valid(entry)).toBe(true);
        expect(entry_valid({ ...entry, meanings: undefined })).toBe(false);
        expect(entry_valid({ ...entry, source_language: "de" })).toBe(false);
        expect(entry_valid({ ...entry, meanings: { ...entry.meanings, en: "house" } })).toBe(false);
        expect(entry_valid({ ...entry, created_at: "yesterday" })).toBe(false);
        expect(entry_valid(null)).toBe(false);
    });
});

// Three stored Entries, newest first: "a" (top), "b", "c".
function entries_abc(): Entry[] {
    const entry = (word: string): Entry => ({ ID: word, created_at: ENTRY_TIME, source_language: "pl", word, meanings: { be: ["x"], pl: [], en: ["x"], ru: ["x"] } });
    return [entry("a"), entry("b"), entry("c")];
}

describe("Table: delete and Undo", () => {
    afterEach(() => { vi.useRealTimers(); });

    it("removes the Entry from the History and from storage at once", () => {
        const storage = history_storage_fake(entries_abc());
        const table = new Table(translator_fake(TRANSLATION_DOM).translator, storage);

        table.entry_delete("b");

        expect(table.state.entries.map(entry => entry.word)).toEqual(["a", "c"]);
        expect(storage.load().map(entry => entry.word)).toEqual(["a", "c"]);
        expect(table.state.deletion?.entry.word).toBe("b");
    });

    it("puts the Entry back at its original position with Undo, also in storage", () => {
        const storage = history_storage_fake(entries_abc());
        const table = new Table(translator_fake(TRANSLATION_DOM).translator, storage);

        table.entry_delete("b");
        table.undo();

        expect(table.state.entries.map(entry => entry.word)).toEqual(["a", "b", "c"]);
        expect(storage.load().map(entry => entry.word)).toEqual(["a", "b", "c"]);
        expect(table.state.deletion).toBeNull();
    });

    it("keeps the original position when a new Entry was added during the Undo time", async () => {
        const table = new Table(translator_fake(TRANSLATION_DOM).translator, history_storage_fake(entries_abc()));

        table.entry_delete("b");
        table.word_set("pl", "dom");
        await table.submit("pl");
        table.undo();

        expect(table.state.entries.map(entry => entry.word)).toEqual(["dom", "a", "b", "c"]);
    });

    it("makes the delete final when the Undo time ends", () => {
        vi.useFakeTimers();
        const table = new Table(translator_fake(TRANSLATION_DOM).translator, history_storage_fake(entries_abc()));

        table.entry_delete("b");
        vi.advanceTimersByTime(UNDO_DURATION_MS);
        table.undo();

        expect(table.state.deletion).toBeNull();
        expect(table.state.entries.map(entry => entry.word)).toEqual(["a", "c"]);
    });

    it("makes the first delete final when a second delete comes during the Undo time", () => {
        vi.useFakeTimers();
        const table = new Table(translator_fake(TRANSLATION_DOM).translator, history_storage_fake(entries_abc()));

        table.entry_delete("a");
        table.entry_delete("c");
        table.undo();

        expect(table.state.entries.map(entry => entry.word)).toEqual(["b", "c"]);
        vi.advanceTimersByTime(UNDO_DURATION_MS);
        expect(table.state.deletion).toBeNull();
    });

    it("uses the original position when the Entry below was removed in another tab", () => {
        const storage = history_storage_fake(entries_abc());
        const table = new Table(translator_fake(TRANSLATION_DOM).translator, storage);

        table.entry_delete("b");
        storage.save(storage.load().filter(entry => entry.ID !== "c"));
        table.history_reload();
        table.undo();

        expect(table.state.entries.map(entry => entry.word)).toEqual(["a", "b"]);
    });

    it("does not add the Entry a second time when another tab already has it again", () => {
        const storage = history_storage_fake(entries_abc());
        const table = new Table(translator_fake(TRANSLATION_DOM).translator, storage);

        table.entry_delete("b");
        storage.save(entries_abc());
        table.history_reload();
        table.undo();

        expect(table.state.entries.map(entry => entry.word)).toEqual(["a", "b", "c"]);
        expect(table.state.deletion).toBeNull();
    });

    it("keeps the message on screen after a delete", async () => {
        const table = new Table(translator_fake({ kind: "mismatch" }).translator, history_storage_fake(entries_abc()));

        table.word_set("en", "dom");
        await table.submit("en");
        table.entry_delete("b");

        expect(table.state.message).toBe('"dom" is not English');
    });

    it("reports a delete that could not be saved", () => {
        const storage: HistoryStorage = { load: entries_abc, save: () => { throw new Error("QuotaExceededError"); } };
        const table = new Table(translator_fake(TRANSLATION_DOM).translator, storage);

        table.entry_delete("b");

        expect(table.state.message).toBe("The History could not be saved on this device – use Export to keep it");
    });
});
