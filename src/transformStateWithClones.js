'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const stateClone = { ...state };
  const statesHistory = [];

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
        for (const key in stateClone) {
          delete stateClone[key];
        }

        break;
      default:
        throw new Error('unexpected action type');
    }
    statesHistory.push({ ...stateClone });
  }

  return statesHistory;
}

module.exports = transformStateWithClones;
