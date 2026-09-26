import "./style.css";
import { LANGUAGES } from "./language";

// Renders the four-column table: a header row and the empty input line (one cell per Language).
function table_render(root: HTMLElement) {
    const table = document.createElement("table");
    table.className = "table";

    const header = table.createTHead().insertRow();
    for (const language of LANGUAGES) {
        const cell = document.createElement("th");
        cell.textContent = language.name;
        header.appendChild(cell);
    }

    const word_line = table.createTBody().insertRow();
    word_line.className = "word-line";
    for (const language of LANGUAGES) {
        const input = document.createElement("input");
        input.type = "text";
        input.dataset.language = language.code;
        input.setAttribute("aria-label", `${language.name} word`);
        input.autocomplete = "off";
        input.spellcheck = false;
        word_line.insertCell().appendChild(input);
    }

    root.replaceChildren(table);
}

table_render(document.getElementById("app")!);
