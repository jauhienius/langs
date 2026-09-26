// The Gemini API key, kept only in this browser (ADR-0001). Never part of the History or an Export.
const KEY_STORAGE_NAME = "langs.gemini_key";

export const SettingsStorage = {
    key_get: (): string | null => localStorage.getItem(KEY_STORAGE_NAME),
    key_set: (key: string) => localStorage.setItem(KEY_STORAGE_NAME, key),
    key_remove: () => localStorage.removeItem(KEY_STORAGE_NAME),
};
