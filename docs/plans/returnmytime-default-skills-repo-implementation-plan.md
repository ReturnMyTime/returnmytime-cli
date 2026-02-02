# Implementation Plan: Default Skills Repo URL + README Quick Start + Find Test

## Overview
Update the returnmytime CLI default skills repo to the full ReturnMyTime GitHub URL, refresh README quick start examples to use that URL, and add a test that validates skill discovery can locate skills under a `skill-packs/` layout.

## Prerequisites
- [x] Confirm default skills repo should be `https://github.com/ReturnMyTime/skills`
- [x] Confirm Quick start examples should use the full URL
- [x] Confirm anthropics examples can remain in Source formats
- [x] Confirm only README updates are required
- [x] Confirm a test should validate skills discovery

## Phase 1: Research & Inventory

### Objective
Identify current defaults and documentation references, and locate discovery logic for testing.

### Tasks
- [x] Review `src/config.ts` for the default skills repo constant.
- [x] Review `README.md` Quick start and Source formats examples.
- [x] Review `src/skills.ts` discovery order and existing test patterns in `tests/`.

### Quality Gate
- [x] All relevant files and sections identified for update.

## Phase 2: Code Update (Default Repo)

### Objective
Ensure the CLI defaults to the ReturnMyTime skills repo URL.

### Tasks
- [x] Update `src/config.ts` to set `DEFAULT_SKILLS_REPO = 'https://github.com/ReturnMyTime/skills'`.
- [x] Validate that `getLocalSkillsRepo()` returns null for the URL (expected behavior).

### Quality Gate
- [x] Default repo in code is the ReturnMyTime URL.

## Phase 3: README Quick Start Update

### Objective
Align Quick start examples with ReturnMyTime skills repo URL.

### Tasks
- [x] Update the Quick start checklist to include:
  - [x] `npx returnmytime`
  - [x] `npx returnmytime find skill`
  - [x] `npx returnmytime add skill https://github.com/ReturnMyTime/skills`
  - [x] `npx returnmytime add skill https://github.com/ReturnMyTime/skills --skill <skill-name>`
- [x] Ensure any Quick start references to local paths are removed.
- [x] Leave anthropics examples intact in Source formats.

### Quality Gate
- [x] Quick start examples use the ReturnMyTime URL and match the desired flow.

## Phase 4: Test Coverage (Find Skills)

### Objective
Add a test that validates skill discovery can find skills under `skill-packs/<category>/<skill>`.

### Tasks
- [x] Add `tests/skills-discovery.test.ts` to:
  - [x] Create a temp repo with a `skill-packs/development/<skill>/SKILL.md`.
  - [x] Optionally add a legacy `skills/<skill>/SKILL.md` to verify both paths.
  - [x] Assert `discoverSkills()` returns the expected skill(s).
- [x] Document how to run the new test in the test file header.

### Quality Gate
- [x] `npx tsx tests/skills-discovery.test.ts` passes.

## Deployment

### Environment Changes
- [x] None

### Database/Migration
- [x] None

### Configuration
- [x] Updated default skills repo URL in `src/config.ts`.

## Verification Checklist
- [x] `README.md` Quick start uses `https://github.com/ReturnMyTime/skills`.
- [x] Default repo in `src/config.ts` uses the full URL.
- [x] New discovery test passes.

## Rollback Plan
Revert `README.md`, `src/config.ts`, and the discovery test file to the previous commit.

## Notes
- This plan keeps anthropics/skills examples in Source formats to preserve generic usage patterns.
