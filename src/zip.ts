import { createWriteStream } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import AdmZip from 'adm-zip';
import { isPathSafe } from './installer/paths.js';

export async function downloadZip(url: string, destPath: string): Promise<void> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download zip (${response.status})`);
  }

  await mkdir(dirname(destPath), { recursive: true });

  if (!response.body) {
    const buffer = Buffer.from(await response.arrayBuffer());
    await writeFile(destPath, buffer);
    return;
  }

  const stream = Readable.fromWeb(response.body);
  await pipeline(stream, createWriteStream(destPath));
}

export async function extractZip(zipPath: string, destDir: string): Promise<void> {
  const zip = new AdmZip(zipPath);
  const entries = zip.getEntries();

  for (const entry of entries) {
    if (entry.isDirectory) continue;

    let entryName = entry.entryName.replace(/\\/g, '/');
    entryName = entryName.replace(/^\/+/, '');

    if (!entryName || entryName.endsWith('/')) continue;
    if (entryName.startsWith('__MACOSX/')) continue;

    const targetPath = join(destDir, entryName);
    if (!isPathSafe(destDir, targetPath)) {
      throw new Error('Invalid path found in zip archive.');
    }

    await mkdir(dirname(targetPath), { recursive: true });
    await writeFile(targetPath, entry.getData());
  }
}
