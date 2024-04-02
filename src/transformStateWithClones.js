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

  for (const { type, extraData, keysToRemove } of actions) {
    switch (type) {
      case 'addProperties':
        Object.assign(stateClone, extraData);
        break;

      case 'removeProperties':
        for (const propToBeRemoved of keysToRemove) {
          if (stateClone.hasOwnProperty(propToBeRemoved)) {
            delete stateClone[propToBeRemoved];
          }
        }
        break;

      case 'clear':
        stateClone = {};
        break;

      default:
        throw new Error('Data is not valid');
    }
    stateHistory.push({ ...stateClone });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
