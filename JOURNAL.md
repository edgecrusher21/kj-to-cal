# Project Journal — kj-to-cal

## 2026-07-21 — Input-validity bugfix (wip/input-guard)

### Bug
`App.tsx:17` used `parseFloat(input) || 0`, which conflates "falsy" with
"invalid." Only `NaN`/`0`/empty were filtered; `Infinity`, `-Infinity`,
negatives, and partially-parsed strings (`"12abc"`, `"1.2.3"` — `parseFloat`
silently truncates) leaked through to `kJtoCal` and rendered nonsensical
numbers in the UI.

### Fix
Extracted a `parseKjInput(input): number | null` helper into `src/input.ts`
with sibling `src/input.test.ts`, mirroring the existing
`converter.ts`/`converter.test.ts` pattern. Returns `null` for empty /
non-finite / negative / partial-parse input. `App.tsx` now does
`parsed === null ? 0 : kJtoCal(parsed)`.

### Policy decision (from Chris)
Validity rule: **non-negative finite number that parses cleanly**, **no
upper cap**. So `"1e10"` is valid (converts to its large result); only
`Infinity`, negatives, and partial/garbage parses are rejected.

### Unrelated issues noticed (not fixed — flagging for Chris)
1. **`ABOUTME:` header rule not applied to existing code files.** Global
   AGENTS.md mandates a 2-line `// ABOUTME:` header on every code file.
   `src/converter.ts` and `src/converter.test.ts` were created before this
   rule was in force (or it was ignored) and lack the headers. New files
   added in this fix (input.ts, input.test.ts) DO include headers per the
   rule, so the `src/` directory is now inconsistent. Decision needed:
   retroactively add headers to converter.ts/converter.test.ts, or drop
   the rule project-wide?
2. **No input-validation tests for the App.tsx render path.** Component
   behavior is untested because React Testing Library isn't a dependency.
   Extracting `parseKjInput` to a pure helper (this fix) sidesteps that
   for the validity rule, but other UI behavior remains untested. May
   warrant adding `@testing-library/react-native` + `jest-expo` later.
3. **`app.json` references Expo SDK config but AGENTS.md tells agents to
   read v56 docs; repo was downgraded to SDK 54.** Possible doc drift —
   when bumping SDK, remember to re-pin the AGENTS.md doc URL.

### Skills/workflow notes for next session
- `systematic-debugging` + `test-driven-development` skills worked well
  together for this. Phase 1 repro via a Node one-liner was the fastest
  way to gather evidence; recommend doing that first for any future
  pure-logic bug in this repo.
- Repo has no `lint` script; typecheck via `npx tsc --noEmit`.