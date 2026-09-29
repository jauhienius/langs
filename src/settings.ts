// The chosen Translator provider and one API key per provider, kept only in this browser (ADR-0001, ADR-0003). Never part of the History or an Export.
export const PROVIDERS = [
    { name: "gemini", title: "Gemini (free)", key_url: "https://aistudio.google.com/apikey", key_site: "aistudio.google.com" },
    { name: "openai", title: "OpenAI (paid)", key_url: "https://platform.openai.com/api-keys", key_site: "platform.openai.com" },
] as const;

export type ProviderName = typeof PROVIDERS[number]["name"];

const PROVIDER_STORAGE_NAME = "langs.provider";
// "langs.gemini_key" is the name from before ADR-0003, so a saved Gemini key stays valid.
const key_storage_name = (provider: ProviderName) => `langs.${provider}_key`;

const provider_valid = (value: string | null): value is ProviderName => PROVIDERS.some(provider => provider.name === value);

// Gemini until the user chooses another provider (the only provider before ADR-0003).
function provider_get(): ProviderName {
    const value = localStorage.getItem(PROVIDER_STORAGE_NAME);
    return provider_valid(value) ? value : "gemini";
}

export const SettingsStorage = {
    provider_get,
    provider_set: (provider: ProviderName) => localStorage.setItem(PROVIDER_STORAGE_NAME, provider),
    key_get: (provider: ProviderName): string | null => localStorage.getItem(key_storage_name(provider)),
    key_set: (provider: ProviderName, key: string) => localStorage.setItem(key_storage_name(provider), key),
    key_remove: (provider: ProviderName) => localStorage.removeItem(key_storage_name(provider)),
};
