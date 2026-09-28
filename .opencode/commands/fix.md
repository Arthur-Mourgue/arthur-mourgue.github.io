---
description: Fix a bug the safe way (reproduce with a test first)
agent: build
---
Bug: $ARGUMENTS

1. Find the cause. Explain it to me in 2-3 sentences.
2. Write a test that reproduces the bug and FAILS. Run it and show it failing.
3. Fix the code (smallest change possible). Show the test passing.
4. Run ./scripts/check.sh until ✅.
5. Commit: `fix: <short description>`.
6. If this mistake could happen again, propose ONE line to add to the
   "Project gotchas" section of AGENTS.md.
