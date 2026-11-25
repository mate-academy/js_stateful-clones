'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const updatedState = { ...state };
  const allStatesHistory = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(updatedState, action.extraData);
        break;

      case 'removeProperties':
        for (const ch of action.keysToRemove) {
          delete updatedState[ch];
        }
        break;

      case 'clear':
        for (const key in updatedState) {
          delete updatedState[key];
        }
        break;

      default:
        return state;
    }
    allStatesHistory.push({ ...updatedState });
  }

  return allStatesHistory;
}

module.exports = transformStateWithClones;
