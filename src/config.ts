import { existsSync, statSync } from 'node:fs';
import { resolve } from 'node:path';

const DEFAULT_SKILLS_REPO = '/Users/nick/Projects/returnmytime-skills';

export function getDefaultSkillsSource(): string {
  return process.env.RETURNMYTIME_SKILLS_REPO?.trim() || DEFAULT_SKILLS_REPO;
}

export function getLocalSkillsRepo(): string | null {
  const source = getDefaultSkillsSource();
  if (!source) return null;
  if (source.startsWith('http://') || source.startsWith('https://')) {
    return null;
  }
  if (source.includes(':') && !source.startsWith('./') && !source.startsWith('../')) {
    // Likely a git URL or shorthand like owner/repo
    return null;
  }
  const resolved = resolve(source);
  if (!existsSync(resolved)) return null;
  const stats = statSync(resolved, { throwIfNoEntry: false });
  if (!stats || !stats.isDirectory()) return null;
  return resolved;
}
