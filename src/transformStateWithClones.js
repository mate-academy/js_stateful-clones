'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let current = { ...state };

  for (const action of actions) {
    const next = { ...current };

    switch (action.type) {
      case 'addProperties':
        Object.assign(next, action.extraData);
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete next[key];
        }
        break;
      case 'clear':
        for (const key of Object.keys(next)) {
          delete next[key];
        }
        break;
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    stateHistory.push(next);
    current = next;
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
