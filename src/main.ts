import "./style.css";
import { HISTORY_STORAGE_NAME, HistoryLocalStorage } from "./history_storage";
import { LANGUAGES, type LanguageCode } from "./language";
import { SettingsStorage } from "./settings";
import { EXPORT_FORMAT, Table, type Entry, type TableState } from "./table";
import { TranslatorGemini } from "./translator_gemini";

const root = document.getElementById("app")!;

function element<K extends keyof HTMLElementTagNameMap>(tag: K, properties: Record<string, unknown> = {}, children: (Node | string)[] = []): HTMLElementTagNameMap[K] {
    const node = Object.assign(document.createElement(tag), properties);
    node.append(...children);
    return node;
}

// Key screen: first start (no key yet) and "⚙" (change or remove the key).
function key_screen_render() {
    const key = SettingsStorage.key_get();
    const key_input = element("input", { type: "password", value: key ?? "", placeholder: "Gemini API key", autocomplete: "off", spellcheck: false, required: true });
    key_input.setAttribute("aria-label", "Gemini API key");
    const key_buttons = key === null ? [] : [
        element("button", { type: "button", textContent: "Remove key", onclick: () => { SettingsStorage.key_remove(); key_screen_render(); } }),
        element("button", { type: "button", textContent: "Cancel", onclick: table_screen_render }),
    ];
    const form = element("form", { className: "key-screen" }, [
        element("label", {}, ["Gemini API key", key_input]),
        element("p", { className: "hint" }, ["Stays only in this browser. Get a free key at ", element("a", { href: "https://aistudio.google.com/apikey", target: "_blank", rel: "noopener", textContent: "aistudio.google.com" }), "."]),
        element("div", { className: "buttons" }, [
            element("button", { type: "submit", textContent: "Save" }),
            ...key_buttons,
        ]),
    ]);
    form.onsubmit = event => {
        event.preventDefault();
        const key_new = key_input.value.trim();
        if (key_new === "") return;
        SettingsStorage.key_set(key_new);
        table_screen_render();
    };
    root.replaceChildren(form);
    key_input.focus();
}

function entry_render(entry: Entry) {
    const line = element("tr");
    for (const language of LANGUAGES) {
        const cell =
        entry.source_language === language.code ? element("td", { className: "source", textContent: entry.word }) : element("td", { textContent: entry.meanings[language.code].join(", ") });
        line.append(cell);
    }
    const delete_button = element("button", { className: "delete", textContent: "×", title: "Delete", type: "button" });
    delete_button.dataset.entry = entry.ID;
    delete_button.setAttribute("aria-label", `Delete "${entry.word}"`);
    line.lastElementChild!.append(delete_button);
    return line;
}

const JSON_TYPE = "application/json";
// Some browsers cancel a download when its URL is released at once.
const DOWNLOAD_URL_LIFETIME_MS = 10000;

// Local date as YYYY-MM-DD (the "sv" locale writes dates in ISO order).
const date_local = () => new Date().toLocaleDateString("sv");

// Saves the History as a file named with today's date, e.g. "langs-history-2026-09-27.json".
function history_download() {
    const link = element("a", { href: URL.createObjectURL(new Blob([table.history_export()], { type: JSON_TYPE })), download: `${EXPORT_FORMAT}-${date_local()}.json` });
    link.click();
    setTimeout(() => URL.revokeObjectURL(link.href), DOWNLOAD_URL_LIFETIME_MS);
}

const table = new Table(new TranslatorGemini(() => SettingsStorage.key_get() ?? ""), HistoryLocalStorage);
let table_unsubscribe = () => {};

// Another tab changed the History: load it again, so this tab does not overwrite it.
window.addEventListener("storage", event => { if (event.key === HISTORY_STORAGE_NAME) table.history_reload(); });

// Table screen: the four columns, the input line, the message line and the History.
function table_screen_render() {
    table_unsubscribe();
    const inputs = {} as Record<LanguageCode, HTMLInputElement>;

    const word_line = element("tr", { className: "word-line" });
    for (const language of LANGUAGES) {
        const input = element("input", { type: "text", autocomplete: "off", spellcheck: false, enterKeyHint: "go" });
        input.setAttribute("aria-label", `${language.name} word`);
        input.oninput = () => table.word_set(language.code, input.value);
        input.onkeydown = event => { if (event.key === "Enter" && !event.isComposing) table.submit(language.code); };
        inputs[language.code] = input;
        word_line.append(element("td", {}, [input]));
    }
    const message = element("td", { colSpan: LANGUAGES.length, className: "message" });
    const message_line = element("tr", { className: "message-line" }, [message]);
    const entries = element("tbody", { className: "entries" });
    entries.onclick = event => {
        const delete_button = (event.target as HTMLElement).closest<HTMLButtonElement>("button.delete");
        if (!delete_button) return;
        table.entry_delete(delete_button.dataset.entry!);
        undo_button.focus();
    };
    const import_input = element("input", { type: "file", accept: `${JSON_TYPE},.json`, hidden: true });
    import_input.onchange = async () => {
        const file = import_input.files?.[0];
        // A file that cannot be read is handled like a file that is not an Export.
        if (file) table.history_import(await file.text().catch(() => ""));
        import_input.value = "";
    };
    const undo_text = element("span");
    const undo_button = element("button", { type: "button", textContent: "Undo", onclick: () => table.undo() });
    const undo_bar = element("div", { className: "undo-bar", hidden: true }, [undo_text, undo_button]);
    undo_bar.setAttribute("role", "status");

    const header = element("tr", {}, LANGUAGES.map(language => element("th", { textContent: language.name })));
    root.replaceChildren(
        element("div", { className: "toolbar" }, [
            element("button", { type: "button", textContent: "Export", onclick: history_download }),
            element("button", { type: "button", textContent: "Import", onclick: () => import_input.click() }),
            import_input,
            element("button", { className: "settings", textContent: "⚙", title: "Gemini API key", onclick: key_screen_render }),
        ]),
        element("table", { className: "table" }, [element("thead", {}, [header]), element("tbody", {}, [word_line, message_line]), entries]),
        undo_bar,
    );

    let entries_rendered: Entry[] | null = null;
    const state_render = (state: TableState) => {
        for (const language of LANGUAGES) {
            const input = inputs[language.code];
            if (input.value !== state.words[language.code]) input.value = state.words[language.code];
            input.readOnly = state.translations_pending[language.code];
            input.parentElement!.classList.toggle("pending", state.translations_pending[language.code]);
        }
        message.textContent = state.message ?? "";
        message_line.hidden = state.message === null;
        undo_text.textContent = state.deletion === null ? "" : `"${state.deletion.entry.word}" deleted`;
        undo_bar.hidden = state.deletion === null;
        // The History is drawn again only when it changes, not on each key press.
        if (state.entries === entries_rendered) return;
        entries.replaceChildren(...state.entries.map(entry_render));
        entries_rendered = state.entries;
    };
    table_unsubscribe = table.subscribe(state_render);
    state_render(table.state);
}

if (SettingsStorage.key_get()) table_screen_render();
else key_screen_render();
