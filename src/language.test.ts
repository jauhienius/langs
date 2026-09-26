import { describe, expect, it } from "vitest";
import { LANGUAGES } from "./language";

describe("LANGUAGES", () => {
    it("lists the four table columns in order: Belarusian, Polish, English, Russian", () => {
        expect(LANGUAGES.map(language => language.code)).toEqual(["be", "pl", "en", "ru"]);
        expect(LANGUAGES.map(language => language.name)).toEqual(["Belarusian", "Polish", "English", "Russian"]);
    });
});
