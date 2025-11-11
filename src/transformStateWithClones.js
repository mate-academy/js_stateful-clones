'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const stateHistory = [];
  const copyState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copyState, action.extraData);
        break;

      case 'removeProperties':
        for (const removedKey of action.keysToRemove) {
          delete copyState[removedKey];
        }
        break;

      case 'clear':
        for (const removedKey in copyState) {
          delete copyState[removedKey];
        }
        break;

      default:
        continue;
    }

    stateHistory.push({ ...copyState });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
