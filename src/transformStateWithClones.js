'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let newState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        newState = { ...newState, ...action.extraData };
        break;
      case 'removeProperties':
        newState = { ...newState };
        action.keysToRemove.forEach((key) => delete newState[key]);
        break;
      case 'clear':
        newState = {};
        break;
      default:
        break;
    }
    stateHistory.push(newState);
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
