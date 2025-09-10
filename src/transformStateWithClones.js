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

  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];

    switch (action.type) {
      case 'addProperties':
        current = { ...current, ...(action.extraData || {}) };
        break;

      case 'removeProperties':
        current = { ...current };

        if (Array.isArray(action.keysToRemove)) {
          for (const key of action.keysToRemove) {
            delete current[key];
          }
        }
        break;

      case 'clear':
        current = {};
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    stateHistory.push({ ...current });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
