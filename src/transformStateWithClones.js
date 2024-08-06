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

  for (const actionObj of actions) {
    // actionObj.type consists of addProperties, removeProperties, clear
    switch (actionObj.type) {
      case 'addProperties':
        Object.assign(stateClone, actionObj.extraData);
        stateHistory.push({ ...stateClone });
        break;
      case 'removeProperties':
        for (const key of actionObj.keysToRemove) {
          delete stateClone[key];
        }
        stateHistory.push({ ...stateClone });
        break;
      case 'clear':
        stateClone = {};
        stateHistory.push(stateClone);
        break;
      default:
        return 1;
    }
  }
  return stateHistory;
}

module.exports = transformStateWithClones;
