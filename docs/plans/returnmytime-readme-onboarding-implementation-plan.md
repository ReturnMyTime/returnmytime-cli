# Implementation Plan: ReturnMyTime README Onboarding + Default Skills Repo

## Overview
Update the returnmytime CLI onboarding examples and defaults to point at https://github.com/ReturnMyTime/skills, align the quick-start flow with the Playbooks style (interactive menu -> find skill -> add repo -> add single skill via --skill), and ensure skill discovery/docs accurately reflect the ReturnMyTime skills layout.

## Prerequisites
- [x] Confirm the canonical skills repo URL: https://github.com/ReturnMyTime/skills
- [x] Confirm single-skill installs should use `--skill <name>` (Playbooks pattern)
- [x] Confirm anthopic skills examples may remain in the generic Source formats section

## Phase 1: Research & Inventory

### Objective
Identify all README and code references to the old skills repo and the existing onboarding flow.

### Tasks
- [x] Review `README.md` sections for quick start, onboarding, source formats, telemetry examples, and skill discovery.
- [x] Locate the default skills repo in `src/config.ts`.
- [x] Verify how `discoverSkills` searches repo roots (standard paths vs recursive fallback).

### Quality Gate
- [x] All references to `/Users/nick/Projects/returnmytime-skills` and `anthropics/skills` examples are enumerated.

## Phase 2: Update Default Skills Repo

### Objective
Make the CLI default skills source point to the ReturnMyTime public skills repo.

### Tasks
- [x] Update `src/config.ts` to set `DEFAULT_SKILLS_REPO` to `https://github.com/ReturnMyTime/skills`.
- [x] Confirm `getLocalSkillsRepo()` still behaves correctly for GitHub URLs.

### Quality Gate
- [x] `src/config.ts` no longer references the local path `/Users/nick/Projects/returnmytime-skills`.

## Phase 3: README Onboarding + Examples (Playbooks-style)

### Objective
Align the README onboarding flow with Playbooks while reflecting ReturnMyTime usage.

### Tasks
- [x] Update **Quick start checklist** to match the Playbooks sequence:
  - [x] `npx returnmytime`
  - [x] `npx returnmytime find skill`
  - [x] `npx returnmytime add skill https://github.com/ReturnMyTime/skills`
  - [x] `npx returnmytime add skill https://github.com/ReturnMyTime/skills --skill <skill-name>`
- [x] Update **Step-by-step onboarding** to remove local path references and use the ReturnMyTime repo URL.
- [x] Update **Override the default repo** example (if kept) to reference a GitHub URL pattern consistent with ReturnMyTime.
- [x] Replace any remaining `returnmytime-skills` path examples in README with the ReturnMyTime repo URL.
- [x] Keep anthropic skills examples only in the **Source formats** section where generic external examples are helpful.
- [x] Update telemetry examples to use the ReturnMyTime repo URL for consistency.

### Quality Gate
- [x] README onboarding flow mirrors Playbooks pattern and all default repo examples point to `https://github.com/ReturnMyTime/skills`.

## Phase 4: Skill Discovery Accuracy (Optional but Recommended)

### Objective
Ensure docs and discovery logic acknowledge the `skill-packs/` layout used by ReturnMyTime/skills.

### Tasks
- [x] Add `skill-packs/` to the README **Skill discovery** list.
- [x] (Optional) Update `src/skills.ts` to prioritize `skill-packs/` before the recursive fallback.
- [x] If discovery logic changes, add or adjust tests to cover `skill-packs/<category>/<skill>` discovery.

### Quality Gate
- [x] README skill discovery section matches actual discovery behavior.

## Deployment

### Environment Changes
- [x] None

### Database/Migration
- [x] None

### Configuration
- [x] Default skills repo updated in `src/config.ts`.

## Verification Checklist
- [x] `README.md` uses the ReturnMyTime skills repo URL in onboarding and default examples.
- [x] Single-skill install example uses `--skill <name>`.
- [x] Source formats section still includes at least one anthropic skills example as a generic reference.
- [x] `src/config.ts` default repo points to `https://github.com/ReturnMyTime/skills`.
- [x] (If updated) `skill-packs/` discovery is reflected in both docs and code.

## Rollback Plan
Revert README and `src/config.ts` to the previous commit and restore any removed examples referencing the local skills repo.

## Notes
- ReturnMyTime/skills currently uses `skill-packs/<category>/<skill>`; consider adding `skill-packs/` as a first-class search root to reduce reliance on recursive fallback.
