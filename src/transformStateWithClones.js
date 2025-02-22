'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const stateCopy = { ...state };
  const stateHistory = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;
      case 'removeProperties':
        for (const keyToRemove of action.keysToRemove) {
          delete stateCopy[keyToRemove];
        }
        break;
      case 'clear':
        for (const k in stateCopy) {
          delete stateCopy[k];
        }
        break;
      default:
        break;
    }

    const stateCopyToPush = { ...stateCopy };

    stateHistory.push(stateCopyToPush);
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
