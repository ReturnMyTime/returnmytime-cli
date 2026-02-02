#!/usr/bin/env tsx

/**
 * Unit tests for searchSkillDirectory() using a local repo path.
 *
 * Run with: npx tsx tests/find-skill-search.test.ts
 */

import assert from 'node:assert';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { searchSkillDirectory } from '../src/flows/find-skill.js';

let passed = 0;
let failed = 0;

async function test(name: string, fn: () => Promise<void> | void) {
  try {
    await fn();
    console.log(`✓ ${name}`);
    passed++;
  } catch (err) {
    console.log(`✗ ${name}`);
    console.error(`  ${(err as Error).message}`);
    failed++;
  }
}

const tempDir = mkdtempSync(join(tmpdir(), 'rmt-find-'));

function writeSkill(dir: string, name: string) {
  mkdirSync(dir, { recursive: true });
  const content = `---\nname: ${name}\ndescription: ${name} skill description for find tests.\n---\n\n# ${name}\n`;
  writeFileSync(join(dir, 'SKILL.md'), content, 'utf-8');
}

writeSkill(join(tempDir, 'skill-packs', 'development', 'prime'), 'prime');

await test('searchSkillDirectory finds skills from a local repo path', async () => {
  const outcome = await searchSkillDirectory('pri', 'lexical', 10, tempDir);
  assert.ok(outcome.results.length > 0, 'Expected at least one result');
  const names = outcome.results.map((result) => result.name);
  assert.ok(names.includes('prime'));
});

rmSync(tempDir, { recursive: true, force: true });

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
