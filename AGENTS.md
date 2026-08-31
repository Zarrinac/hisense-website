# Hisense Iran Website — agent guide

**Read [`CLAUDE.md`](./CLAUDE.md). It is the single source of truth for agent instructions in this
repo, regardless of which assistant you are.**

This file used to be a full copy of `CLAUDE.md`, forked for Codex on 2026-06-08. By 2026-08-31 the
copy had drifted three months behind: it still described a `.husky/pre-push` review hook that no
longer exists, a Playwright E2E suite that was never configured, and none of the July/August
learnings (PM2 env precedence, the catalog-asset pipeline, IndexNow, the zarrinac cross-domain
canonical fix). Two 200-line guides cannot be kept in step by hand, and the stale one silently wins
whenever an agent happens to read it first — so this is a pointer now, on purpose. Do not
re-fork it.

What lives where:

| File                      | Contents                                                                                      |
| ------------------------- | --------------------------------------------------------------------------------------------- |
| `CLAUDE.md`               | Agent instructions: SEO priority, commands, architecture, conventions, gotchas, deploy & ops  |
| `DOCS.md`                 | Long-form reference: every route, model, admin section, SEO detail, ops runbook, incident log |
| `README.md`               | Human-facing setup and overview                                                               |
| `.claude/ship.deploy.yml` | Machine-readable deploy procedure (ssh target, ordered steps, health check, rollback)         |
| `ops/README.md`           | Server-side scripts and the rules governing them                                              |

Two constraints worth knowing before you touch anything, both expanded in `CLAUDE.md`:

- **SEO efficiency is the top priority.** Judge every change by its SEO impact; keep one `<h1>` per
  page, keep `fa` and `en` in sync (hreflang depends on it), and don't break ISR or the sitemap.
- **There is no test suite**, and no test dependency either. The real gates are `npm run lint`,
  `npx tsc --noEmit`, `npm run format`, and `npm run build`. Don't cite `npx playwright test`.
