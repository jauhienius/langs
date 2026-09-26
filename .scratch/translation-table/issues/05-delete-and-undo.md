# 05: Delete and Undo

**What to build:** Each Entry has a small "×". Tapping it removes the Entry at once, with no confirmation dialog, and shows an "Undo" message for about five seconds. Undo puts the Entry back at its original position. Entries cannot be edited. See spec: `.scratch/translation-table/spec.md` (Delete and Undo).

**Blocked by:** 04

**Status:** done

- [x] "×" on each Entry, usable on a phone (large enough tap target)
- [x] Delete removes the Entry from the History and from storage without a dialog
- [x] "Undo" message visible for about five seconds (duration defined as a named constant)
- [x] Undo restores the Entry at its original position and in storage
- [x] After the Undo time ends, the delete is final
- [x] A second delete during the Undo time replaces the first Undo (the first delete becomes final)
- [x] Core tests: delete; Undo restores position; Undo expiry; second delete during Undo time
- [x] Visual check through Playwright at phone width

## Comments

- Undo re-inserts before the Entry that was below it; if that Entry is gone (other tab) it uses the original index; if the Entry already exists again, Undo only closes the bar (no duplicate ID).
- A delete keeps any message on screen; a failed save during delete/Undo shows the save message.
- Accessibility: the Undo bar has role="status"; focus moves to Undo after a delete; the page gets bottom room while the bar is visible. The × tap target is 36px (WCAG 2.5.8 AA).
