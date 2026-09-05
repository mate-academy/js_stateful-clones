#!/usr/bin/env bash
# PreToolUse hook for Bash(git push*): blocks the push unless `npm test` succeeds.
set -uo pipefail

LOG="$(mktemp)"
trap 'rm -f "$LOG"' EXIT

if ! npm test > "$LOG" 2>&1; then
  reason="$(tail -c 3000 "$LOG" | tr -d '\r' | tr '\n' ' ' | sed 's/\\/\\\\/g; s/"/\\"/g')"
  printf '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":"git push blocked - npm test failed: %s"}}\n' "$reason"
  exit 0
fi

exit 0
