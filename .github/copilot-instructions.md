---
description: "Strict StretchTracker engineering rules for React Navigation, Expo validation, and atomic commits"
---

# StretchTracker Copilot Instructions

## Non-Negotiable Workflow
- Validation is mandatory, not optional.
- For any code change, run `npx tsc --noEmit` before declaring completion.
- For changes that affect runtime behavior, run `npx expo-doctor`.
- For UI or navigation changes, run `npm run start` (or `npm run web` when native is unavailable) and verify the touched screen flow loads.
- If a command cannot run in the current environment, explicitly report what was skipped and why.
- Fix errors introduced by the current task before finishing.

## Architecture Guardrails
- Keep navigation centralized in `src/navigation/RootNavigator.tsx` and `src/navigation/routes.ts`.
- Do not introduce parallel navigation systems when React Navigation already covers the flow.
- Reuse existing app structure (`src/screens`, `src/features`, `src/components`, `src/state`) before adding new top-level patterns.
- Favor shared wrappers and primitives (`AppScreen`, `AppButton`) instead of duplicating layout or button behavior.
- Keep screen responsibilities focused and move reusable logic into feature modules.

## File and Folder Structure
- Every component and screen must live in its own folder named after the component/screen (e.g., `AppButton/`, `HomeScreen/`).
- The main file inside that folder must always be `index.tsx`. Never create a file named `ComponentName.tsx` at the folder level.
- Any component or screen that has styles must have a `styles.ts` file in the same folder.
- The `index.tsx` file must import its styles from `./styles` — never define styles inline in `index.tsx`.
- Example structure:
  ```
  src/components/AppButton/
    index.tsx       ← component logic, imports styles from ./styles
    styles.ts       ← StyleSheet definitions only
  src/screens/HomeScreen/
    index.tsx
    styles.ts
  ```
- Apply this structure to all new files. When modifying an existing file that does not follow this structure, migrate it as part of the task.

## React Native Rules
- Use React Native primitives and platform-safe APIs; avoid browser-only assumptions.
- Keep styles consistent with project theme modules in `src/theme`.
- Maintain accessibility basics for interactive controls (labels, readable text, touch-friendly targets).

## Change Scope and Quality Bar
- Prefer small, focused diffs tied to one intent.
- Do not modify unrelated files for convenience.
- Preserve existing behavior unless the request explicitly requires behavior changes.
- Keep component and navigation contracts stable unless the change request requires an API adjustment.

## Atomic Commit Policy
- Keep commits atomic: one functionality change OR one debug fix per commit.
- Never combine unrelated feature work, refactors, and bug fixes in one commit.
- If requested work spans concerns, propose and execute a split sequence.

## Commit Message Style
- Use a simple one-line summary of the scoped change.
- Prefer concrete wording over broad summaries.
- Do not describe multiple unrelated actions in one message.

## Commenting Standard
- Write comments only where intent is not obvious from code.
- Favor concise rationale comments over narrating each line.
- Remove stale comments when behavior changes.

## Done Criteria
- Requested behavior is implemented.
- Relevant validation commands were run (or constraints clearly reported).
- No new type or runtime-check issues were left by the change.
- Diff remains scoped and reviewable.
