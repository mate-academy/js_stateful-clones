# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Task

This is a Mate Academy training exercise. Implement `transformStateWithClones(state, actions)` in `src/transformStateWithClones.js` — it applies a sequence of `actions` to an initial `state`, returning an array of the resulting state after each action, **without mutating** the original `state` object.

Action types:
- `clear` — resets to an empty object
- `addProperties` — merges `extraData` key/value pairs into the new state
- `removeProperties` — removes keys listed in `keysToRemove` (ignore keys that don't exist)

Each entry in the returned array must be a state built from the previous state in the chain — never mutate the original `state`. See `readme.md` for the full spec and examples, and `src/transformStateWithClones.test.js` for exact expected behavior.

## Commands

- `npm test` — runs lint (`npm run format` + `mate-scripts lint`) then the test suite; this is what CI/grading runs.
- `npm run test:only` — runs the Jest suite without linting.
- `npx jest -t "<test name>"` — run a single test by name (all tests live in `src/transformStateWithClones.test.js`).
- `npm run lint` — formats with Prettier then runs `mate-scripts lint` (ESLint).
- `npm run format` — Prettier only, writes in place.

## Code style rules (from `checklist.md`, enforced in review)

- Never mutate the input object or arrays — copy with `Object.assign` or the spread operator instead.
- Use a `switch` statement when there's a limited, fixed set of conditions (i.e. for branching on `action.type`).
- Every `switch` must have a `default` case for error handling.
- Don't repeat an action performed in every `switch` case — factor it out to run once after the switch.
- Name object copies descriptively (e.g. `stateCopy`), not generically (e.g. `copy`).
