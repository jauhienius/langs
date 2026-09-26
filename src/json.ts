// Parses JSON from outside the app (stored data, files); null when the text is not JSON.
export function json_parse(text: string): unknown {
    try { return JSON.parse(text); }
    catch { return null; }
}
