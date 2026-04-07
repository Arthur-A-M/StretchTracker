---
description: "Project rules for testing rigor and atomic commits in StretchTracker"
---

# StretchTracker Copilot Instructions

## Testing First
- Treat verification as required work, not optional cleanup.
- Before finishing a coding task, run type checking with `npx tsc --noEmit`.
- When a change affects runtime behavior, also run a local Expo smoke check with `npx expo -c` when feasible.
- Report what was tested and what could not be tested.
- If warnings or errors appear, fix them before closing the task when they are related to the change.

## Atomic Commit Policy
- Keep commits atomic.
- One commit must contain only one functionality change OR one debug fix.
- Do not combine multiple unrelated features, refactors, and fixes in the same commit.
- If work spans separate concerns, split it into separate commits.

## Commit Message Style
- Keep commit messages simple and easy to scan.
- Summary line should describe one scoped change in plain language.
- Avoid broad summaries that imply many unrelated changes.

## Scope Guardrails
- Prefer small, focused diffs.
- Avoid touching unrelated files just because they are nearby.
- If a requested change would produce a large mixed commit, pause and propose a split plan first.

## Commenting Style
- Comment code more abundantly than a typical developer would.
- Do not save comments for only complex sections; annotate intent and behavior throughout the implementation.
- Write comments so the code can be scanned quickly and understood without separate documentation.
- If the code itself is not immediately obvious, add comments that explain what it does and why.
- Prefer clear, direct comments that help both humans and AI readers follow the flow.
