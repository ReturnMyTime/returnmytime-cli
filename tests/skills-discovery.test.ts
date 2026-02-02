#!/usr/bin/env tsx

/**
 * Unit tests for discoverSkills() with skill-packs support.
 *
 * Run with: npx tsx tests/skills-discovery.test.ts
 */

import assert from 'node:assert';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { discoverSkills } from '../src/skills.js';

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

const tempDir = mkdtempSync(join(tmpdir(), 'rmt-skills-'));

function writeSkill(dir: string, name: string) {
  mkdirSync(dir, { recursive: true });
  const content = `---\nname: ${name}\ndescription: ${name} skill description for discovery tests.\n---\n\n# ${name}\n`;
  writeFileSync(join(dir, 'SKILL.md'), content, 'utf-8');
}

writeSkill(join(tempDir, 'skill-packs', 'development', 'alpha'), 'alpha');
writeSkill(join(tempDir, 'skills', 'beta'), 'beta');

await test('discoverSkills finds skills under skill-packs and skills', async () => {
  const skills = await discoverSkills(tempDir);
  const names = skills.map((skill) => skill.name).sort();
  assert.deepStrictEqual(names, ['alpha', 'beta']);
});

rmSync(tempDir, { recursive: true, force: true });

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
