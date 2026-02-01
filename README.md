# returnmytime

Install agent skills, MCPs, and docs into your coding agents from git repositories or zip files.

Works with **OpenCode**, **Claude Code**, **Codex**, **Cursor**, plus many more.

## Outline

- [Quick start checklist](#quick-start-checklist)
- [Step-by-step onboarding](#step-by-step-onboarding)
- [What to expect after install](#what-to-expect-after-install)
- [Troubleshooting](#troubleshooting)
- [Local development (working on this repo)](#local-development-working-on-this-repo)
- [Commands](#commands)
- [Source formats](#source-formats)
- [Fetch a URL as markdown](#fetch-a-url-as-markdown)
- [Available agents](#available-agents)
- [Skill discovery](#skill-discovery)
- [Telemetry](#telemetry)
- [FAQ](#faq)
- [License](#license)
- [Credits](#credits)

## Quick start checklist

1) Run the interactive menu:
```bash
npx returnmytime
```

2) Install skills from the default repo:
```bash
npx returnmytime add skill /Users/nick/Projects/returnmytime-skills
```

3) Install a single skill:
```bash
npx returnmytime add skill /Users/nick/Projects/returnmytime-skills --skill frontend-design
```

4) Install private skills from a zip:
```bash
npx returnmytime add skill ./private-skills.zip
```

---

## Step-by-step onboarding

### 1) Use it instantly (npx, no install)

```bash
npx returnmytime
```

You’ll get an interactive menu to add, find, list, manage, and update skills.

### 2) Install globally (optional)

```bash
npm i -g returnmytime
returnmytime --help
```

### 3) Add skills from the default repo

By default, returnmytime points to:

```text
/Users/nick/Projects/returnmytime-skills
```

Install all skills from that repo:

```bash
npx returnmytime add skill /Users/nick/Projects/returnmytime-skills
```

Install a single skill:

```bash
npx returnmytime add skill /Users/nick/Projects/returnmytime-skills --skill frontend-design
```

### 4) Override the default repo (optional)

```bash
RETURNMYTIME_SKILLS_REPO=owner/repo npx returnmytime add skill
```

### 5) Install private skills from a zip

```bash
npx returnmytime add skill ./private-skills.zip
npx returnmytime add skill https://example.com/private-skills.zip
```

The zip can contain one or more skill folders, each with a `SKILL.md` file.

---

## What to expect after install

- Skills are placed into each agent’s skills directory (project or global), depending on your choice.
- In symlink mode, skills are stored once in `.agents/skills` and linked into each agent folder.
- Use `returnmytime list skill` to verify what is installed.
- Use `returnmytime update skill` to refresh tracked skills later.

---

## Troubleshooting

- If no agents are detected, pick agents manually when prompted and install again.
- If a skill doesn’t show up, check that `SKILL.md` has valid `name` and `description` frontmatter.
- For permission errors, re-run with `-g` (global install) or choose a writable project directory.

---

## Local development (working on this repo)

```bash
# clone and install
npm install

# run the CLI in dev mode
npm run dev -- --help
```

Optional: use the global `returnmytime` command while developing.

```bash
npm run build
npm link
returnmytime --help
```

To test the exact npm package output:

```bash
npm pack
npx ./returnmytime-*.tgz --help
```

---

## Commands

returnmytime uses an action/type command structure:

- `returnmytime add skill <source>`
- `returnmytime find skill`
- `returnmytime list skill`
- `returnmytime manage skill`
- `returnmytime update skill [skill-names...]`
- `returnmytime get <url> [out <path>]`

### Options (add skill)

| Option                    | Description                                                                                                                                        |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `-g, --global`            | Install to user directory instead of project                                                                                                       |
| `-a, --agent <agents...>` | <!-- agent-names:start -->Target specific agents (e.g., `claude-code`, `codex`). See [Available Agents](#available-agents)<!-- agent-names:end --> |
| `-s, --skill <skills...>` | Install specific skills by name                                                                                                                    |
| `-l, --list`              | List available skills without installing                                                                                                           |
| `-y, --yes`               | Skip all confirmation prompts                                                                                                                      |
| `--all`                   | Install all skills to all agents without prompts (implies -y -g)                                                                                   |

---

## Source formats

The `<source>` argument accepts multiple formats:

- GitHub shorthand
```bash
returnmytime add skill anthropics/skills
```

- Full GitHub URL
```bash
returnmytime add skill https://github.com/anthropics/skills
```

- Direct path to a skill in a repo
```bash
returnmytime add skill https://github.com/anthropics/skills/tree/main/skills/release-notes
```

- GitLab URL
```bash
returnmytime add skill https://gitlab.com/org/repo
```

- Any git URL
```bash
returnmytime add skill git@github.com:anthropics/skills.git
```

- Zip file (local or URL)
```bash
returnmytime add skill ./private-skills.zip
returnmytime add skill https://example.com/private-skills.zip
```

- Direct SKILL.md URL
```bash
returnmytime add skill https://docs.example.com/skills/my-skill/SKILL.md
```

- Docs URL (well-known skills discovery)
```bash
returnmytime add skill https://mintlify.com/docs
returnmytime add skill mintlify.com/docs
```

- Marketplace.json (path)
```bash
returnmytime add skill ./path/to/.claude-plugin/marketplace.json
```

- Marketplace.json (URL)
```bash
returnmytime add skill https://raw.githubusercontent.com/org/repo/main/.claude-plugin/marketplace.json
```

- Marketplace.json (owner/repo path)
```bash
returnmytime add skill org/repo/.claude-plugin/marketplace.json
```

---

## Fetch a URL as markdown

```bash
# Output markdown to stdout
returnmytime get https://example.com

# Save markdown to a file
returnmytime get https://example.com out notes.md

# Output JSON metadata instead of raw markdown
returnmytime get https://example.com --json
```

---

## Available agents

Skills can be installed to any of these supported agents. Use `-g, --global` to install to the global path instead of project-level.

<!-- available-agents:start -->
| Agent | `--agent` | Project Path | Global Path |
|-------|-----------|--------------|-------------|
| AdaL | `adal` | `.adal/skills/` | `~/.adal/skills/` |
| Amp | `amp` | `.agents/skills/` | `~/.config/agents/skills/` |
| Antigravity | `antigravity` | `.agent/skills/` | `~/.gemini/antigravity/global_skills/` |
| Augment | `augment` | `.augment/rules/` | `~/.augment/rules/` |
| Claude Code | `claude-code` | `.claude/skills/` | `~/.claude/skills/` |
| Clawdbot | `clawdbot` | `skills/` | `~/.clawdbot/skills/` |
| Cline | `cline` | `.cline/skills/` | `~/.cline/skills/` |
| CodeBuddy | `codebuddy` | `.codebuddy/skills/` | `~/.codebuddy/skills/` |
| Codex | `codex` | `.codex/skills/` | `~/.codex/skills/` |
| Command Code | `command-code` | `.commandcode/skills/` | `~/.commandcode/skills/` |
| Continue | `continue` | `.continue/skills/` | `~/.continue/skills/` |
| Crush | `crush` | `.crush/skills/` | `~/.config/crush/skills/` |
| Cursor | `cursor` | `.cursor/skills/` | `~/.cursor/skills/` |
| Droid | `droid` | `.factory/skills/` | `~/.factory/skills/` |
| Gemini CLI | `gemini-cli` | `.gemini/skills/` | `~/.gemini/skills/` |
| GitHub Copilot | `github-copilot` | `.github/skills/` | `~/.copilot/skills/` |
| Goose | `goose` | `.goose/skills/` | `~/.config/goose/skills/` |
| iFlow CLI | `iflow-cli` | `.iflow/skills/` | `~/.iflow/skills/` |
| Junie | `junie` | `.junie/skills/` | `~/.junie/skills/` |
| Kilo Code | `kilo` | `.kilocode/skills/` | `~/.kilocode/skills/` |
| Kimi Code CLI | `kimi-cli` | `.agents/skills/` | `~/.config/agents/skills/` |
| Kiro CLI | `kiro-cli` | `.kiro/skills/` | `~/.kiro/skills/` |
| Kode | `kode` | `.kode/skills/` | `~/.kode/skills/` |
| MCPJam | `mcpjam` | `.mcpjam/skills/` | `~/.mcpjam/skills/` |
| Mistral Vibe | `mistral-vibe` | `.vibe/skills/` | `~/.vibe/skills/` |
| Mux | `mux` | `.mux/skills/` | `~/.mux/skills/` |
| Neovate | `neovate` | `.neovate/skills/` | `~/.neovate/skills/` |
| OpenClaude IDE | `openclaude` | `.openclaude/skills/` | `~/.openclaude/skills/` |
| OpenClaw | `openclaw` | `skills/` | `~/.openclaw/skills/` |
| OpenCode | `opencode` | `.opencode/skills/` | `~/.config/opencode/skills/` |
| OpenHands | `openhands` | `.openhands/skills/` | `~/.openhands/skills/` |
| Pi | `pi` | `.pi/skills/` | `~/.pi/agent/skills/` |
| Pochi | `pochi` | `.pochi/skills/` | `~/.pochi/skills/` |
| Qoder | `qoder` | `.qoder/skills/` | `~/.qoder/skills/` |
| Qwen Code | `qwen-code` | `.qwen/skills/` | `~/.qwen/skills/` |
| Replit | `replit` | `.agent/skills/` | *(project only)* |
| Roo Code | `roo` | `.roo/skills/` | `~/.roo/skills/` |
| Trae | `trae` | `.trae/skills/` | `~/.trae/skills/` |
| Trae CN | `trae-cn` | `.trae/skills/` | `~/.trae-cn/skills/` |
| Windsurf | `windsurf` | `.windsurf/skills/` | `~/.codeium/windsurf/skills/` |
| Zencoder | `zencoder` | `.zencoder/skills/` | `~/.zencoder/skills/` |
<!-- available-agents:end -->

---

## Skill discovery

The CLI searches for skills in these locations within a repository:

<!-- skill-discovery:start -->
- Root directory (if it contains `SKILL.md`)
- `skills/`
- `skills/.curated/`
- `skills/.experimental/`
- `skills/.system/`
- `.adal/skills/`
- `.agent/skills/`
- `.agents/skills/`
- `.augment/rules/`
- `.claude/skills/`
- `.cline/skills/`
- `.codebuddy/skills/`
- `.codex/skills/`
- `.commandcode/skills/`
- `.continue/skills/`
- `.crush/skills/`
- `.cursor/skills/`
- `.factory/skills/`
- `.gemini/skills/`
- `.github/skills/`
- `.goose/skills/`
- `.iflow/skills/`
- `.junie/skills/`
- `.kilocode/skills/`
- `.kiro/skills/`
- `.kode/skills/`
- `.mcpjam/skills/`
- `.mux/skills/`
- `.neovate/skills/`
- `.openclaude/skills/`
- `.opencode/skills/`
- `.openhands/skills/`
- `.pi/skills/`
- `.pochi/skills/`
- `.qoder/skills/`
- `.qwen/skills/`
- `.roo/skills/`
- `.trae/skills/`
- `.vibe/skills/`
- `.windsurf/skills/`
- `.zencoder/skills/`
<!-- skill-discovery:end -->

If no skills are found in standard locations, a recursive search is performed.

---

## Telemetry

This CLI collects anonymous usage data to help improve the tool. No personal information is collected.

To disable telemetry, set any of these environment variables:

```bash
DISABLE_TELEMETRY=1 returnmytime add skill anthropics/skills
# or
DO_NOT_TRACK=1 returnmytime add skill anthropics/skills
# or
RETURNMYTIME_DISABLE_TELEMETRY=1 returnmytime add skill anthropics/skills
```

Telemetry is also automatically disabled in CI environments.

---

## FAQ

**Where are skills installed?**  
Project installs go into the repo’s agent folders (and `.agents/skills` for symlinks). Global installs go under your home directory for each agent. See [Available agents](#available-agents) for exact paths.

**How do I uninstall a skill?**  
Use `returnmytime manage skill` to remove installed skills interactively.

**How do I update skills?**  
Run `returnmytime update skill` or target specific skills by name.

**Can I install from multiple sources?**  
Yes. Run `returnmytime add skill ...` as many times as you want from different repos or zips.

**Why isn’t a skill detected?**  
Make sure the folder contains a `SKILL.md` with valid `name` and `description` frontmatter.

**Where are symlinked skills stored?**  
By default, symlink installs store the canonical copy in `.agents/skills` (project) or `~/.agents/skills` (global), then link into each agent directory.

**What should a zip file contain?**  
One or more folders, each containing a `SKILL.md` at the root of that folder. Any extra files (references, assets) are included with the skill.

**How do I target a specific agent?**  
Use `--agent` with one or more agent IDs. Example: `returnmytime add skill owner/repo --agent claude-code --agent codex`.

---

## License

MIT

## Credits

Credit: @iannuttall - forked from his playcook-cli repository
