# graphify

- **graphify** (`~/.claude/skills/graphify/SKILL.md`) - any input to knowledge graph. Trigger: `/graphify`
  When the user types `/graphify`, invoke the Skill tool with `skill: "graphify"` before doing anything else.

The skill is installed per-machine under `~/.claude/skills/`, not in this repo (`.claude/.gitignore`
excludes `skills/`). Invoke it by name — the Skill tool resolves it; the path above is only a pointer.
