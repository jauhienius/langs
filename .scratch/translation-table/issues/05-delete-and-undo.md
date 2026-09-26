# 05: Delete and Undo

**What to build:** Each Entry has a small "×". Tapping it removes the Entry at once, with no confirmation dialog, and shows an "Undo" message for about five seconds. Undo puts the Entry back at its original position. Entries cannot be edited. See spec: `.scratch/translation-table/spec.md` (Delete and Undo).

**Blocked by:** 04

**Status:** ready-for-agent

- [ ] "×" on each Entry, usable on a phone (large enough tap target)
- [ ] Delete removes the Entry from the History and from storage without a dialog
- [ ] "Undo" message visible for about five seconds (duration defined as a named constant)
- [ ] Undo restores the Entry at its original position and in storage
- [ ] After the Undo time ends, the delete is final
- [ ] A second delete during the Undo time replaces the first Undo (the first delete becomes final)
- [ ] Core tests: delete; Undo restores position; Undo expiry; second delete during Undo time
- [ ] Visual check through Playwright at phone width
