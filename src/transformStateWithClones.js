'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  let stateClone = { ...state };
  const stateHistory = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateClone, action.extraData);
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateClone[key];
        }
        break;
      case 'clear':
        stateClone = {};
        break;
      default:
        return;
    }

    stateHistory.push({ ...stateClone });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
