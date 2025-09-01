'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let prev = { ...state };
  const history = [];

  for (const a of actions) {
    switch (a.type) {
      case 'clear':
        prev = {};
        break;

      case 'addProperties':
        prev = { ...prev, ...(a.extraData || {}) };
        break;

      case 'removeProperties': {
        const toRemove = new Set(a.keysToRemove || []);

        prev = Object.fromEntries(
          Object.entries(prev).filter(([k]) => !toRemove.has(k)),
        );
        break;
      }

      default:
        throw new Error(`Unknown action type: ${a.type}`);
    }

    history.push(prev);
  }

  return history;
}

module.exports = transformStateWithClones;
