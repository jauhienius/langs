// Belarusian quality test: sends each Word through an LLM with the real prompt, writes a markdown report.
// Usage: node run.mjs --list gemini|xai|openai                                  (list available models)
//        node run.mjs gemini:<model_ID> | xai:<model_ID> | openai:<model_ID> [words_file]  (run the test; words_file defaults to words.json)
// OpenAI reasoning effort: OPENAI_REASONING_EFFORT environment variable, default "none" as in the app (src/translator_openai.ts).
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const DIRECTORY = dirname(fileURLToPath(import.meta.url));
const KEY_FILE = "D:/Dev/langs/.env.local";
const MEANINGS_MAX = 3;
const LANGUAGES = { be: "Belarusian (official Cyrillic orthography)", pl: "Polish", en: "English", ru: "Russian" };

const PROMPT_SYSTEM = `You are a dictionary for four languages: Belarusian (official modern Cyrillic orthography, not Taraškievica, not Łacinka), Polish, English, Russian.
The user gives a word or short phrase and states its source language.
1. Decide whether the input is a real word or phrase of the stated source language. If it is not (it belongs to another language, or is not a word at all), set "mismatch" to true and leave all translations empty. A word that is valid in the source language counts as valid even if it also exists in other languages.
2. Otherwise set "mismatch" to false and translate it into the other three languages. For each target language give exactly one translation per distinct meaning, most common first. Most words have one meaning, so give one translation. Give more (up to ${MEANINGS_MAX}) only when the input is a homonym with clearly unrelated meanings (e.g. "bank": financial institution / river bank). Never list synonyms of the same meaning. Give only the words: no stress marks, no grammar notes, no explanations. Use the dictionary base form.
Rules for every translation:
- It must be a real, existing word or phrase of the target language, written only in that language's script. If unsure, give fewer items rather than inventing a word.
- Never repeat the same word in one list. If several meanings share one spelling in the target language, list that spelling once.
- Leave the array for the source language empty.`;

const SCHEMA_PROPERTIES = ["mismatch", "be", "pl", "en", "ru"];
const schema_build = (type_boolean, type_array, type_string, type_object) => ({
    type: type_object,
    properties: Object.fromEntries(SCHEMA_PROPERTIES.map(p => [p, p === "mismatch" ? { type: type_boolean } : { type: type_array, items: { type: type_string } }])),
    required: SCHEMA_PROPERTIES,
});

const keys_read = () => {
    const lines = readFileSync(KEY_FILE, "utf8").split(/\r?\n/);
    return Object.fromEntries(lines.filter(l => l.includes("=")).map(l => [l.slice(0, l.indexOf("=")).trim(), l.slice(l.indexOf("=") + 1).trim()]));
};
const keys = keys_read();
const key_get = name => keys[name] ?? (() => { throw new Error(`${name}= line not found in ${KEY_FILE}`); })();

const PROVIDERS = {
    gemini: {
        delay_ms: 4500, // free tier ~15 RPM
        list: async () => {
            const body = await json_fetch("https://generativelanguage.googleapis.com/v1beta/models?pageSize=1000", { headers: { "x-goog-api-key": key_get("GEMINI_API_KEY") } });
            return body.models.filter(m => m.supportedGenerationMethods?.includes("generateContent")).map(m => m.name);
        },
        translate: async (model, text) => {
            const schema = { ...schema_build("BOOLEAN", "ARRAY", "STRING", "OBJECT"), propertyOrdering: SCHEMA_PROPERTIES };
            const request = {
                systemInstruction: { parts: [{ text: PROMPT_SYSTEM }] },
                contents: [{ role: "user", parts: [{ text }] }],
                generationConfig: { temperature: 0, responseMimeType: "application/json", responseSchema: schema },
            };
            const body = await json_fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
                method: "POST", headers: { "x-goog-api-key": key_get("GEMINI_API_KEY"), "content-type": "application/json" }, body: JSON.stringify(request),
            });
            return body.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
        },
    },
    xai: {
        delay_ms: 1000,
        list: async () => {
            const body = await json_fetch("https://api.x.ai/v1/models", { headers: { authorization: `Bearer ${key_get("XAI_API_KEY")}` } });
            return body.data.map(m => m.id);
        },
        translate: async (model, text) => {
            const request = {
                model,
                temperature: 0,
                messages: [{ role: "system", content: PROMPT_SYSTEM }, { role: "user", content: text }],
                response_format: { type: "json_schema", json_schema: { name: "entry", strict: true, schema: { ...schema_build("boolean", "array", "string", "object"), additionalProperties: false } } },
            };
            const body = await json_fetch("https://api.x.ai/v1/chat/completions", {
                method: "POST", headers: { authorization: `Bearer ${key_get("XAI_API_KEY")}`, "content-type": "application/json" }, body: JSON.stringify(request),
            });
            return body.choices?.[0]?.message?.content ?? "";
        },
    },
    openai: {
        delay_ms: 200, // Tier 1: 500 RPM
        list: async () => {
            const body = await json_fetch("https://api.openai.com/v1/models", { headers: { authorization: `Bearer ${key_get("OPENAI_API_KEY")}` } });
            return body.data.map(m => m.id).sort();
        },
        translate: async (model, text) => {
            const request = {
                model,
                reasoning_effort: process.env.OPENAI_REASONING_EFFORT ?? "none",
                messages: [{ role: "developer", content: PROMPT_SYSTEM }, { role: "user", content: text }],
                response_format: { type: "json_schema", json_schema: { name: "entry", strict: true, schema: { ...schema_build("boolean", "array", "string", "object"), additionalProperties: false } } },
            };
            const body = await json_fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST", headers: { authorization: `Bearer ${key_get("OPENAI_API_KEY")}`, "content-type": "application/json" }, body: JSON.stringify(request),
            });
            return body.choices?.[0]?.message?.content ?? "";
        },
    },
};

async function json_fetch(url, options) {
    const response = await fetch(url, options);
    const body = await response.json();
    if (!response.ok) throw new Error(`${response.status} ${body.error?.message ?? JSON.stringify(body)}`);
    return body;
}

const sleep = ms => new Promise(r => setTimeout(r, ms));
const cell = (result, language) => (result[language] ?? []).join(", ").replaceAll("|", "\\|");

async function word_translate(provider, model, item) {
    const time_start = Date.now();
    try {
        const text = await provider.translate(model, `Source language: ${LANGUAGES[item.language]}\nInput: ${item.word}`);
        return { result: JSON.parse(text), duration_ms: Date.now() - time_start };
    }
    catch (error) { return { error: error.message, duration_ms: Date.now() - time_start }; }
}

async function test_run(provider_name, model, words_file) {
    const provider = PROVIDERS[provider_name];
    const words = JSON.parse(readFileSync(join(DIRECTORY, words_file), "utf8"));
    const lines = [
        `# Belarusian test — ${provider_name}:${model}`, "",
        "| # | Source | Word | Mismatch | BE | PL | EN | RU | ms | Note |",
        "|---|---|---|---|---|---|---|---|---|---|",
    ];
    for (const [index, item] of words.entries()) {
        const outcome = await word_translate(provider, model, item);
        const number = index + 1;
        console.log(`${number}/${words.length} ${item.word} ${outcome.error ?? "ok"}`);
        if (outcome.error) lines.push(`| ${number} | ${item.language} | ${item.word} | ERROR | ${outcome.error.replaceAll("|", "/")} | | | | ${outcome.duration_ms} | ${item.note} |`);
        else {
            const r = outcome.result;
            lines.push(`| ${number} | ${item.language} | ${item.word} | ${r.mismatch ? "**YES**" : ""} | ${cell(r, "be")} | ${cell(r, "pl")} | ${cell(r, "en")} | ${cell(r, "ru")} | ${outcome.duration_ms} | ${item.note} |`);
        }
        await sleep(provider.delay_ms);
    }
    const report_path = join(DIRECTORY, `report-${provider_name}-${model}-${words_file.replace(".json", "")}.md`);
    writeFileSync(report_path, lines.join("\n") + "\n");
    console.log(`Report: ${report_path}`);
}

const [argument, argument_second] = process.argv.slice(2);
if (!argument) throw new Error("Pass --list <provider> or <provider>:<model_ID>");
if (argument === "--list") console.log((await PROVIDERS[argument_second].list()).join("\n"));
else {
    const [provider_name, model] = argument.split(":");
    await test_run(provider_name, model, argument_second ?? "words.json");
}
