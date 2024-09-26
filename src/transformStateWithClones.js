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
      case 'clear':
        currentState = {};
        break;
      case 'addProperties':
        currentState = { ...currentState, ...action.extraData };
        break;
      case 'removeProperties':
        const keysToRemove = action.keysToRemove;

        for (const key of keysToRemove) {
          delete currentState[key];
        }
        break;
      default:
        break;
    }

    stateHistory.push({ ...currentState });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
