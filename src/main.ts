import "./style.css";
import { LANGUAGES, type LanguageCode } from "./language";
import { SettingsStorage } from "./settings";
import { Table, type Entry, type TableState } from "./table";
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
    return line;
}

const table = new Table(new TranslatorGemini(() => SettingsStorage.key_get() ?? ""));
let table_unsubscribe = () => {};

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

    const header = element("tr", {}, LANGUAGES.map(language => element("th", { textContent: language.name })));
    root.replaceChildren(
        element("div", { className: "toolbar" }, [element("button", { className: "settings", textContent: "⚙", title: "Gemini API key", onclick: key_screen_render })]),
        element("table", { className: "table" }, [element("thead", {}, [header]), element("tbody", {}, [word_line, message_line]), entries]),
    );

    const state_render = (state: TableState) => {
        for (const language of LANGUAGES) {
            const input = inputs[language.code];
            if (input.value !== state.words[language.code]) input.value = state.words[language.code];
            input.readOnly = state.translations_pending[language.code];
            input.parentElement!.classList.toggle("pending", state.translations_pending[language.code]);
        }
        message.textContent = state.message ?? "";
        message_line.hidden = state.message === null;
        entries.replaceChildren(...state.entries.map(entry_render));
    };
    table_unsubscribe = table.subscribe(state_render);
    state_render(table.state);
}

if (SettingsStorage.key_get()) table_screen_render();
else key_screen_render();
