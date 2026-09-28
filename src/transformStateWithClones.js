'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateWithHistory = [];
  let currentState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        currentState = {};
        stateWithHistory.push({ ...currentState });
        break;

      case 'removeProperties':
        currentState = { ...currentState };

        for (const keyToRemove of action.keysToRemove) {
          delete currentState[keyToRemove];
        }

        stateWithHistory.push({ ...currentState });
        break;

      case 'addProperties':
        currentState = { ...currentState };

        for (const [key, value] of Object.entries(action.extraData)) {
          currentState[key] = value;
        }

        stateWithHistory.push({ ...currentState });
        break;

      default:
        stateWithHistory.push({ ...currentState });
    }
  }

  return stateWithHistory;
}

module.exports = transformStateWithClones;
