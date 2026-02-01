import { existsSync } from 'node:fs';
import { mkdir, mkdtemp } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { discoverSkills } from '../skills.js';
import { registerTempDir } from '../temp-registry.js';
import type { ParsedSource, Skill } from '../types.js';
import { downloadZip, extractZip } from '../zip.js';

export async function prepareZipSkills(
  parsed: ParsedSource
): Promise<{ tempDir: string; skills: Skill[] }> {
  if (parsed.type !== 'zip') {
    throw new Error('Invalid zip source.');
  }

  const tempDir = await mkdtemp(join(tmpdir(), 'returnmytime-zip-'));
  registerTempDir(tempDir);

  const extractDir = join(tempDir, 'extracted');
  await mkdir(extractDir, { recursive: true });

  const zipPath = parsed.localPath ?? join(tempDir, 'skills.zip');

  if (parsed.localPath) {
    if (!existsSync(parsed.localPath)) {
      throw new Error(`Zip file not found: ${parsed.localPath}`);
    }
  } else {
    await downloadZip(parsed.url, zipPath);
  }

  await extractZip(zipPath, extractDir);
  const skills = await discoverSkills(extractDir);

  if (skills.length === 0) {
    throw new Error('No valid skills found in zip. Need a SKILL.md with name and description.');
  }

  return { tempDir, skills };
}
