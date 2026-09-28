---
description: Start a work session on the next feature (read state, implement, check, commit)
agent: build
---
Session startup. Current state of the repo:

Recent commits:
!`git log --oneline -10`

Uncommitted changes:
!`git status --short`

Progress notes: @PROGRESS.md
Task list: @features.json

Now follow exactly these steps:
1. If there are uncommitted changes you don't understand, STOP and ask me.
2. Pick the first feature with status "todo" whose `depends_on` are all "done".
   Tell me which one. Set its status to "in_progress".
3. Implement it. Write tests that cover EVERY acceptance criterion.
4. Run ./scripts/check.sh. Fix and re-run until it prints ✅.
   If it still fails after 5 attempts: set status "blocked", explain why in
   PROGRESS.md, and STOP.
5. Ask @reviewer to review the diff. Fix what it reports, re-run check.sh.
6. Set the feature status to "done", add an entry to PROGRESS.md.
7. Commit with a Conventional Commit message, e.g. `feat(F003): add login form`.
8. Stop. Do not start another feature.
