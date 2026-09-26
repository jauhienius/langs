# Langs

A personal translation table: one word is entered in one language and is shown in all four supported languages side by side, with a scrollable history of past lookups.

## Language

**Language**:
One of the four fixed languages of the table: Belarusian (official Cyrillic orthography), Polish, English, Russian. Each Language has exactly one column.
_Avoid_: Locale, lang

**Source Language**:
The Language of the column the user typed the word into. It is always chosen by the user, never detected.
_Avoid_: Input language, detected language

**Language Mismatch**:
The case where the typed word does not belong to its Source Language (e.g. a Polish word typed into the English column). It is reported to the user and produces no Entry; it is never silently corrected.
_Avoid_: Wrong language, detection error

## Table

**Word**:
What the user types into one cell: a single word or a short phrase of up to about five words (e.g. "make up", "dzień dobry").
_Avoid_: Query, term, input

**Entry**:
One line of the table: a typed word in its Source Language plus its translations into the other three Languages.
_Avoid_: Row, lookup, record

**Meaning**:
One distinct sense of a Word. A translation cell has one translation per Meaning: a single word for most Words, and up to three comma-separated words only for homonyms (e.g. Polish "zamek" → English "castle, lock, zipper"). Synonyms of the same Meaning are never listed; no stress marks, no grammar notes.
_Avoid_: Sense, variant

**History**:
All Entries on one device, newest first. Repeated Words create new Entries; Entries can be deleted but not edited. A History exists only on its device unless moved by Export and Import.
_Avoid_: Log, list

**Export** / **Import**:
Saving the whole History to a file, and loading a History from such a file. The only way to back up a History or move it to another device.
_Avoid_: Backup, sync
