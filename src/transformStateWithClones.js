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
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(stateClone, extraData);
        break;
      case 'removeProperties':
        for (const key of keysToRemove) {
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
