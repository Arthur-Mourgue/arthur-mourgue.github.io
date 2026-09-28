# Architecture

## What this project actually is
A static portfolio site plus an offline image pipeline. There is no server,
no build step, no package graph and no module system. "Layers" here mean
*who produces what*, not importable packages.

```
docs/            editorial + strategy + art direction (French, human-facing)
site/            the deployed website (pure HTML/CSS/vanilla JS)
  *.html         pages: index + projects/*.html
  assets/css     style.css — all art direction, variables at the top
  assets/js      site.js  — two IIFEs: theme toggle + cursor tracking
  assets/img     images; produced by tools/
  assets/video   generated videos (git-ignored except README.txt)
tools/           offline pipeline: CAD/photo -> web assets (Python + ffmpeg)
scripts/         agent harness: check.sh, setup.sh
```

### Data flow
`tools/*.py` and `tools/duotone.sh` read raw inputs and write into
`site/assets/{img,video}`. The site then only *reads* those static files.
Nothing in `site/` imports anything from `tools/` at runtime.

### Shared front-end
The 5 HTML pages each embed their own markup and link the same
`assets/css/style.css` and `assets/js/site.js`. `site.js` has no imports;
the two IIFEs are independent.

## Why there is no automated architecture contract
- `import-linter` needs a Python package with intra-package imports. `tools/`
  is a set of standalone scripts → no contract to express.
- `dependency-cruiser` needs JS modules and a `package.json`. `site.js` is a
  single file with zero imports → nothing to enforce.
Both were intentionally NOT installed. See `docs/decisions/0001-baseline.md`.

## Current violations / known debt (observed, not aspirational)
- Header/footer/theme-toggle markup is duplicated across the 5 HTML pages
  (copy-paste, no templating or include step).
- The CSS cache-buster `?v=N` is hard-coded per page and can drift between pages.
- No HTML validation, no lint, no tests: `check.sh` covers syntax and JSON only.
- `tools/` outputs are not reproducible in CI (opencv/scipy/ffmpeg not installed there).
- `site/assets/img/og.png` is referenced but not committed yet.

## Cross-cutting rules
- Validate anything crossing a boundary (user input, files, env) — currently
  the only "input" is static HTML, so keep data hard-coded rather than guessed.
- No secrets in the repo; `.env*` is git-ignored and blocked by the pre-commit hook.
- Keep `site/` dependency-free: it must stay a folder you can drop on any host.
