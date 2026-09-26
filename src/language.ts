// The four fixed Languages of the table, in column order (see CONTEXT.md).
export const LANGUAGES = [
    { code: "be", name: "Belarusian" },
    { code: "pl", name: "Polish" },
    { code: "en", name: "English" },
    { code: "ru", name: "Russian" },
] as const;

export type LanguageCode = (typeof LANGUAGES)[number]["code"];

export const language_name = (code: LanguageCode) => LANGUAGES.find(language => language.code === code)!.name;

// Builds an object with one value per Language, so no code lists the four Languages by hand.
export const language_record = <T>(value_get: (code: LanguageCode) => T) => Object.fromEntries(LANGUAGES.map(language => [language.code, value_get(language.code)])) as Record<LanguageCode, T>;
