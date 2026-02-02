# Implementation Plan: Find Skills Default Repo Pathing

## Overview
Make the Find Skills flow search the ReturnMyTime public GitHub repo by default (via temporary clone and local discovery) while still honoring user-supplied repos. This fixes the current behavior where Find Skills falls back to the marketplace API and returns nothing for the ReturnMyTime skills repo.

## Prerequisites
- [x] Default skills repo is `https://github.com/ReturnMyTime/skills`.
- [x] Find Skills should search that repo by default.
- [x] If the user provides a different repo, search that repo instead.
- [x] Cloning on each Find Skills run is acceptable for now.
- [x] `lastSource` should still take precedence for Add Skills input.

## Phase 1: Research

### Objective
Identify the current Find Skills flow and where the repo source is derived.

### Tasks
- [x] Review `src/flows/find-skill.ts` for `searchSkillDirectory` behavior and local search fallback logic.
- [x] Review `src/tui/screens/FindSkillSearch.tsx` and `FindSkillResults.tsx` for how Find Skills transitions into Add Skills.
- [x] Review `src/tui/screens/AddSource.tsx` for default source and lastSource precedence.

### Quality Gate
- [x] Current behavior understood: Find Skills only searches local repos when `getLocalSkillsRepo()` resolves a local path; GitHub URLs fall back to API search.

## Phase 2: Default Repo Search for Find Skills

### Objective
Ensure Find Skills uses the ReturnMyTime repo URL by default and can search any user-specified repo.

### Tasks
- [x] Introduce a way to resolve a **search repo source** for Find Skills:
  - [x] Prefer explicit user input (if provided in the Find flow).
  - [x] Else use `getDefaultSkillsSource()`.
- [x] Update `searchSkillDirectory()` to:
  - [x] If the selected source is a GitHub URL or shorthand, clone to a temp dir and run `discoverSkills()` for lexical matching.
  - [x] If the selected source is a local path, run `discoverSkills()` directly (existing behavior).
  - [x] Fall back to `searchSkills()` only when no source is specified or clone fails.
- [x] Ensure `FindSkillResult.localRepoPath` is set for cloned repos so the Add flow can proceed without re-fetching.

### Quality Gate
- [x] Typing a partial skill name (e.g., `prime`) in Find Skills returns matches from ReturnMyTime/skills by default.

## Phase 3: TUI Flow Alignment

### Objective
Keep the Add Skills source input clean while preserving lastSource precedence.

### Tasks
- [x] Confirm `AddSourceScreen` continues to prioritize `lastSource` over the default URL.
- [x] Update any Find Skills prompts to reflect that search is against the default repo unless specified.

### Quality Gate
- [x] Find Skills does not force Add Skills to change its source unless user chooses to.

## Phase 4: Tests

### Objective
Cover the new Find Skills repository resolution behavior.

### Tasks
- [x] Add/extend tests to simulate Find Skills using a GitHub-style source by pointing at a temp repo clone (or mock the clone step).
- [x] Validate lexical search returns expected matches from `skill-packs/<category>/<skill>`.

### Quality Gate
- [x] New/updated tests pass (`npx tsx tests/...`).

## Deployment

### Environment Changes
- [x] None

### Database/Migration
- [x] None

### Configuration
- [x] None beyond code changes.

## Verification Checklist
- [x] Find Skills defaults to `https://github.com/ReturnMyTime/skills`.
- [x] Find Skills can search a user-provided repo and return matching skills.
- [x] Add Skills still uses `lastSource` when present.
- [x] Skills like `prime` show up in Find Skills as you type.

## Rollback Plan
Revert Find Skills changes and restore the previous API-only search fallback.

## Notes
- Marketplace support is coming later; this plan focuses on direct repo search only.
