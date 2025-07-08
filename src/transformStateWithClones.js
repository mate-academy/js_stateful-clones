'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const statesHistory = [];

  const currentState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        Object.keys(currentState).forEach((key) => delete currentState[key]);
        break;
      case 'addProperties':
        Object.assign(currentState, action.extraData);
        break;
      case 'removeProperties':
        action.keysToRemove.forEach((key) => delete currentState[key]);
        break;
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    statesHistory.push({ ...currentState });
  }

  return statesHistory;
}

module.exports = transformStateWithClones;
