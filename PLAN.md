# ReturnMyTime CLI Implementation Plan

> Tracked checklist. Update to [x] when complete.

## Phase 1 — Mirror playbooks-cli scaffold
- [x] Copy playbooks-cli repo structure into returnmytime-cli (src, scripts, tests, .github, configs) without overwriting existing LICENSE
- [x] Verify tree matches playbooks-cli at a high level (src/, scripts/, tests/, .github/, package.json, tsconfig.json, etc.)
- [x] Remove/adjust any playbooks-specific artifacts that conflict with returnmytime repo

## Phase 2 — Rebrand to returnmytime
- [x] Update `package.json` (name, bin, description, keywords, repo metadata)
- [x] Rename CLI entry and help text from playbooks -> returnmytime
- [x] Update UI branding (header, tagline, prompts, menu labels) to returnmytime
- [x] Rename environment variables and API constants to RETURNMYTIME_* equivalents

## Phase 3 — Default public skills repo
- [x] Add config for default skills repo path (env override + default `/Users/nick/Projects/returnmytime-skills`)
- [x] Update add-skill flow to default to returnmytime skills repo when source not provided
- [x] Update find-skill flow to use returnmytime skills repo (local search fallback)
- [x] Ensure telemetry/source identifiers reflect returnmytime branding

## Phase 4 — Private skills zip support
- [x] Extend source parser to detect zip paths/URLs and add `zip` source type
- [x] Implement safe zip download + extraction with zip-slip protection
- [x] Hook zip source handling into add-skill flow (select/install)
- [x] Track zip installs in skill lock with `sourceType: zip`
- [x] Update update-skills flow to treat zip sources as non-updatable
- [x] Add tests for zip parsing/extraction and update behavior

## Phase 5 — Docs + QA
- [x] Rewrite README for returnmytime usage, defaults, and zip installs
- [x] Add/refresh AGENTS.md for returnmytime repo guidance
- [x] Run tests (`npm test`), typecheck, lint; fix issues
- [x] Manual smoke test key CLI flows (add/find/list/manage/update/get)
