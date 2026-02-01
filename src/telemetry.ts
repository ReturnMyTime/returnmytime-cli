import { createHmac } from 'node:crypto';

const API_BASE =
  process.env.RETURNMYTIME_API_URL?.trim() ||
  process.env.PLAYBOOKS_API_URL?.trim() ||
  'https://returnmytime.com/api';
const TELEMETRY_URL =
  process.env.RETURNMYTIME_TELEMETRY_URL?.trim() ||
  process.env.PLAYBOOKS_TELEMETRY_URL?.trim() ||
  `${API_BASE}/skill/t`;

interface TelemetryInstallPayload {
  source: string;
  sourceType?: string;
  skills: string[];
  agents: string[];
  global?: boolean;
  skillFiles?: Record<string, string>;
}

let cliVersion: string | null = null;

function isCI(): boolean {
  return !!(
    process.env.CI ||
    process.env.GITHUB_ACTIONS ||
    process.env.GITLAB_CI ||
    process.env.CIRCLECI ||
    process.env.TRAVIS ||
    process.env.BUILDKITE ||
    process.env.JENKINS_URL ||
    process.env.TEAMCITY_VERSION
  );
}

function isEnabled(): boolean {
  return (
    !process.env.DISABLE_TELEMETRY &&
    !process.env.DO_NOT_TRACK &&
    !process.env.RETURNMYTIME_DISABLE_TELEMETRY &&
    !process.env.PLAYBOOKS_DISABLE_TELEMETRY
  );
}

export function setVersion(version: string): void {
  cliVersion = version;
}

function buildHeaders(body: string): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'User-Agent': 'returnmytime-cli',
  };

  if (cliVersion) {
    headers['X-Returnmytime-Version'] = cliVersion;
  }

  const timestamp = new Date().toISOString();
  headers['X-Returnmytime-Timestamp'] = timestamp;

  const secret =
    process.env.RETURNMYTIME_TELEMETRY_SECRET || process.env.PLAYBOOKS_TELEMETRY_SECRET;
  if (secret) {
    const signature = createHmac('sha256', secret).update(`${timestamp}.${body}`).digest('hex');
    headers['X-Returnmytime-Signature'] = signature;
  }

  return headers;
}

export function trackInstall(payload: TelemetryInstallPayload): void {
  if (!isEnabled()) return;

  try {
    const body = JSON.stringify({
      ...payload,
      version: cliVersion ?? undefined,
      ci: isCI() || undefined,
    });

    fetch(TELEMETRY_URL, {
      method: 'POST',
      headers: buildHeaders(body),
      body,
    }).catch(() => {});
  } catch {
    // telemetry should never break the CLI
  }
}
