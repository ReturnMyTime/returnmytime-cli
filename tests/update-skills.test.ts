#!/usr/bin/env tsx

import assert from 'node:assert';
import { updateSkills } from '../src/flows/update-skills.js';
import type { UpdateTarget } from '../src/flows/update-skills.js';

let passed = 0;
let failed = 0;
const runs: Promise<void>[] = [];

function test(name: string, fn: () => Promise<void> | void) {
  const run = Promise.resolve()
    .then(fn)
    .then(() => {
      console.log(`✓ ${name}`);
      passed++;
    })
    .catch((err) => {
      console.log(`✗ ${name}`);
      console.error(`  ${(err as Error).message}`);
      failed++;
    });
  runs.push(run);
}

test('updateSkills skips zip sources', async () => {
  const targets: UpdateTarget[] = [
    {
      name: 'zip-skill',
      scope: 'global',
      status: 'needs-update',
      entry: {
        source: 'file.zip',
        sourceType: 'zip',
        sourceUrl: 'file.zip',
        skillFolderHash: '',
        installedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    },
  ];

  const summary = await updateSkills(targets);
  assert.strictEqual(summary.updated.length, 0);
  assert.strictEqual(summary.failed.length, 0);
  assert.strictEqual(summary.skipped.length, 1);
});

Promise.all(runs).then(() => {
  console.log(`\n${passed} passed, ${failed} failed`);
  process.exit(failed > 0 ? 1 : 0);
});
