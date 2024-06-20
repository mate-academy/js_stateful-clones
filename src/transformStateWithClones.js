'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  let stateClone = { ...state };
  const stateHistory = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        stateClone = { ...stateClone, ...action.extraData };
        break;
      case 'removeProperties':
        stateClone = { ...stateClone };

        for (const key of action.keysToRemove) {
          delete stateClone[key];
        }
        break;

      case 'clear':
        stateClone = {};
        break;
      default:
        continue;
    }

    stateHistory.push({ ...stateClone });
  }

  return stateHistory;
}
module.exports = transformStateWithClones;
