'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateClone = {...state};
  let actionHistory = [];
  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        stateClone = {...stateClone,...action.extraData}
        break;
      case 'removeProperties':
        action.keysToRemove.forEach(key => {
          delete stateClone[key];
        });
        break;
      case 'clear':
        stateClone = {};

        break;
      default:
    }
    actionHistory.push({...stateClone});
  }
  return actionHistory;
}

module.exports = transformStateWithClones;
