'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let stateClone = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        for (const data in action.extraData) {
          stateClone[data] = action.extraData[data];
        }
        break;

      case 'removeProperties':
        for (const data in action.keysToRemove) {
          delete stateClone[action.keysToRemove[data]];
        }
        break;

      case 'clear':
        stateClone = {};
        break;

      default:
        break;
    }

    stateHistory.push({ ...stateClone });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
