---
description: Turn an idea into small, testable features (no code written)
agent: plan
---
I want to add: $ARGUMENTS

Read docs/architecture.md and features.json. Do NOT write code.
Produce:
1. The list of small features needed (each doable in one session, < ~200 lines changed).
2. For each: id, title, the files it will touch, acceptance criteria written as
   checkable statements ("GET /users returns 401 without token"), and depends_on.
3. Any architecture question or risk I must decide before we start.
Output the features as JSON entries ready to paste into features.json.
