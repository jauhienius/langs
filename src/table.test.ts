import { describe, expect, it } from "vitest";
import { Table } from "./table";
import type { Translator, TranslatorOutcome } from "./translator";

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

const TRANSLATION_DOM: TranslatorOutcome = { kind: "translation", meanings: { be: ["дом"], pl: [], en: ["house", "home"], ru: ["дом"] } };

describe("Table", () => {
    it("adds an Entry with the Word and its translations at the top after a successful translation", async () => {
        const { translator } = translator_fake(TRANSLATION_DOM);
        const table = new Table(translator);

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
        const table = new Table(translator);

        table.word_set("pl", "dom");
        await table.submit("pl");
        table.word_set("ru", "дом");
        await table.submit("ru");

        expect(table.state.words.pl).toBe("");
        expect(table.state.entries.map(entry => entry.word)).toEqual(["дом", "dom"]);
    });

    it("reports a Language Mismatch with a message, adds no Entry and keeps the Word in its cell", async () => {
        const { translator } = translator_fake({ kind: "mismatch" });
        const table = new Table(translator);

        table.word_set("en", "dom");
        await table.submit("en");

        expect(table.state.entries).toEqual([]);
        expect(table.state.message).toBe('"dom" is not English');
        expect(table.state.words.en).toBe("dom");
    });

    it("removes the message after the next successful translation", async () => {
        const outcomes: TranslatorOutcome[] = [{ kind: "mismatch" }, TRANSLATION_DOM];
        const table = new Table({ translate: async () => outcomes.shift()! });

        table.word_set("en", "dom");
        await table.submit("en");
        table.word_set("pl", "dom");
        await table.submit("pl");

        expect(table.state.message).toBeNull();
    });

    it("sends the Word without leading and trailing spaces", async () => {
        const { translator, calls } = translator_fake(TRANSLATION_DOM);
        const table = new Table(translator);

        table.word_set("pl", "  dzień dobry ");
        await table.submit("pl");

        expect(calls).toEqual([{ word: "dzień dobry", source_language: "pl" }]);
        expect(table.state.entries[0].word).toBe("dzień dobry");
    });

    it("does nothing when the cell is empty or has only spaces", async () => {
        const { translator, calls } = translator_fake(TRANSLATION_DOM);
        const table = new Table(translator);

        await table.submit("en");
        table.word_set("en", "   ");
        await table.submit("en");

        expect(calls).toEqual([]);
        expect(table.state.entries).toEqual([]);
    });

    it("marks the cell as pending while the translation runs and tells listeners about each change", async () => {
        let answer: (outcome: TranslatorOutcome) => void = () => {};
        const table = new Table({ translate: () => new Promise(resolve => { answer = resolve; }) });
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
        const table = new Table(translator);

        table.word_set("ru", "коса");
        await table.submit("ru");

        expect(table.state.entries[0].meanings).toEqual({ be: ["каса"], pl: ["kosa", "warkocz", "mierzeja"], en: ["scythe"], ru: [] });
    });

    it("adds no Entry and keeps the Word when the translation has no Meaning in any Language", async () => {
        const { translator } = translator_fake({ kind: "translation", meanings: { be: [], pl: ["dom"], en: [" "], ru: [] } });
        const table = new Table(translator);

        table.word_set("pl", "dom");
        await table.submit("pl");

        expect(table.state.entries).toEqual([]);
        expect(table.state.message).toBe('No translation found for "dom"');
        expect(table.state.words.pl).toBe("dom");
    });
});
