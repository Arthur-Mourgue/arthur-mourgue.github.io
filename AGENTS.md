# AGENTS.md — read this first, every session

## Golden rules
1. Work on ONE feature at a time, taken from `features.json`. Never start a second one.
2. Before saying "done", run `./scripts/check.sh`. It must end with ✅. No exceptions.
3. NEVER weaken a check to make it pass: no skipped/deleted tests, no editing lint/CI
   config. If a check looks wrong, STOP and ask. See the README's non-coder rules.
4. Do not change the architecture or add a dependency without asking.
   See `docs/architecture.md`.
5. One finished feature = one commit, Conventional Commits (`feat: ...`, `fix: ...`).
6. At the end of every session, append a short entry to `PROGRESS.md`.

## Commands
- Full check: `./scripts/check.sh` — JSON + JS/Python/Shell syntax only. No install needed.
- Tests: none exist. There is no test framework and no lint/type tooling (see
  `docs/decisions/0001-baseline.md`). Do not invent a test command.
- Run the site locally: `python3 -m http.server 8000 --directory site`
  (open http://localhost:8000). A plain `file://` open breaks the CSS mask.

## Where to find things (read ONLY when relevant to the current task)
- `docs/architecture.md` — the real layers and what not to break.
- `docs/decisions/` — why things are the way they are. Read before changing a design choice.
- `features.json` — task list + acceptance criteria. Source of truth for "what to do".
- `PROGRESS.md` — what previous sessions did and what is blocked.
- `docs/01`…`05` — editorial/strategy/art-direction docs (French). Content, not code.

## Bug-fixing protocol
1. Reproduce the bug by hand (browser / local server). There is no test harness yet.
2. Fix with the smallest change possible.
3. `./scripts/check.sh` green → commit `fix: ...`.

## Project gotchas (add one line each time an agent repeats the same mistake)
- CSS is cache-busted: bump `assets/css/style.css?v=N` in every HTML page when you edit it.
- Placeholders live in brackets (`[date]`, `[YOUR_EMAIL]`) and `<mark class="todo">` spans;
  do not silently delete them — they are intentional content TODOs.
- `tools/` is an offline image pipeline (opencv/numpy/scipy), not part of the site runtime.
