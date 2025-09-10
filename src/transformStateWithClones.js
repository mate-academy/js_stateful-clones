'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let currentState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        currentState = { ...currentState, ...(action.extraData || {}) };
        break;

      case 'removeProperties':
        if (Array.isArray(action.keysToRemove)) {
          const stateCopy = { ...currentState };

          for (const key of action.keysToRemove) {
            delete stateCopy[key];
          }
          currentState = stateCopy;
        }
        break;

      case 'clear':
        currentState = {};
        break;

      default:
        throw new Error('Wrong type of action');
    }

    stateHistory.push({ ...currentState });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
