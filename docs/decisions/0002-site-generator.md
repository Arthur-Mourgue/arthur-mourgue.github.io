# 0002 — Zero-dependency generator for the static site

Date: 2026-09-28
Status: accepted

## Context
The five HTML pages each repeated the same `<head>` boilerplate, theme-toggle
button and script tag. The only ways to remove that duplication on a static site
are (a) a build step, (b) client-side includes (breaks no-JS and SEO), or
(c) leaving it. The project has no server and no package manager, and the owner
did not want new dependencies.

## Decision
Add `tools/build_site.py`, a **standard-library-only** generator:
- sources live in `site-src/` (`layout.html`, `partials/`, `pages.json`,
  `pages/*.body.html`);
- it writes the five pages into `site/`, which are still committed so the site
  can be served and deployed without running the build;
- `scripts/check.sh` fails if `site/` is not up to date (`--check`);
- `tools/test_site.py` (stdlib `unittest`) verifies output freshness, required
  metadata and that every local reference exists.

As part of the move, project pages also gained a `<meta name="description">`
and Open Graph title/description (the index already had them).

## Consequences
- **Edit `site-src/`, not `site/*.html`.** The README explains the new workflow.
- Generated HTML is kept in git: deploys and `python3 -m http.server` need no build.
- The generator is verified to reproduce the original pages byte-for-byte except
  for the added metadata lines, so the art direction is untouched.
- `check.sh` gained two steps but still installs nothing.
- Do NOT hand-edit `site/`; do NOT add a templating dependency (Jinja, 11ty…)
  without a new decision — the whole point is zero dependency.
