'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  const nextState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        Object.keys(nextState).forEach((key) => delete nextState[key]);
        break;

      case 'addProperties':
        Object.assign(nextState, action.extraData);
        break;

      case 'removeProperties':
        action.keysToRemove.forEach((key) => delete nextState[key]);
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    stateHistory.push({ ...nextState });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
