#!/usr/bin/env tsx

import assert from 'node:assert';
import { mkdir, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import AdmZip from 'adm-zip';
import { prepareZipSkills } from '../src/flows/zip-skill.js';
import type { ParsedSource } from '../src/types.js';
import { extractZip } from '../src/zip.js';

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

async function withTempDir(fn: (dir: string) => Promise<void>) {
  const dir = join(tmpdir(), `rmt-zip-test-${Date.now()}-${Math.random().toString(16).slice(2)}`);
  await mkdir(dir, { recursive: true });
  try {
    await fn(dir);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}

// Test: extract valid zip
test('extractZip writes files safely', async () => {
  await withTempDir(async (dir) => {
    const zipPath = join(dir, 'skill.zip');
    const outDir = join(dir, 'out');
    await mkdir(outDir, { recursive: true });

    const zip = new AdmZip();
    zip.addFile('my-skill/SKILL.md', Buffer.from('---\nname: test\ndescription: test\n---\n'));
    zip.writeZip(zipPath);

    await extractZip(zipPath, outDir);
    const extracted = await readFile(join(outDir, 'my-skill', 'SKILL.md'), 'utf-8');
    assert.ok(extracted.includes('name: test'));
  });
});

// Test: zip slip detection
test('extractZip normalizes zip slip entries', async () => {
  await withTempDir(async (dir) => {
    const zipPath = join(dir, 'bad.zip');
    const outDir = join(dir, 'out');
    await mkdir(outDir, { recursive: true });

    const zip = new AdmZip();
    zip.addFile('../evil.txt', Buffer.from('nope'));
    zip.writeZip(zipPath);

    await extractZip(zipPath, outDir);

    const inside = join(outDir, 'evil.txt');
    const outside = join(dir, 'evil.txt');
    const insideContent = await readFile(inside, 'utf-8');
    assert.strictEqual(insideContent, 'nope');

    let outsideExists = true;
    try {
      await readFile(outside, 'utf-8');
    } catch {
      outsideExists = false;
    }
    assert.strictEqual(outsideExists, false);
  });
});

// Test: prepareZipSkills discovers skills
test('prepareZipSkills discovers skills in zip', async () => {
  await withTempDir(async (dir) => {
    const zipPath = join(dir, 'skills.zip');
    const zip = new AdmZip();
    zip.addFile(
      'skill-one/SKILL.md',
      Buffer.from('---\nname: zip-skill\ndescription: zip desc\n---\n')
    );
    zip.writeZip(zipPath);

    const parsed: ParsedSource = {
      type: 'zip',
      url: zipPath,
      localPath: zipPath,
    };

    const result = await prepareZipSkills(parsed);
    assert.strictEqual(result.skills.length, 1);
    assert.strictEqual(result.skills[0]?.name, 'zip-skill');
  });
});

Promise.all(runs).then(() => {
  console.log(`\n${passed} passed, ${failed} failed`);
  process.exit(failed > 0 ? 1 : 0);
});
