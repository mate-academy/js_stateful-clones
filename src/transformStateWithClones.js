'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  const stateClone = { ...state };

  for (const { type, extraData, keysToRemove } of actions) {
    switch (type) {
      case 'addProperties':
        Object.assign(stateClone, extraData);
        break;
      case 'removeProperties':
        for (const propToBeRemoved of keysToRemove) {
          delete stateClone[propToBeRemoved];
        }
        break;
      case 'clear':
        for (const key in stateClone) {
          if (stateClone.hasOwnProperty(key)) {
            delete stateClone[key];
          }
        }
        break;
      default:
        throw new Error('Data is not valid');
    }

    stateHistory.push({ ...stateClone });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
