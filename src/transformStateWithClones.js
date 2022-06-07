'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = { ...state };
  const stateCloneHistory = [];

  for (const { type, extraData, keysToRemove } of actions) {
    switch (type) {
      case 'addProperties':
        Object.assign(stateClone, extraData);

        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          if (stateClone.hasOwnProperty(key)) {
            delete stateClone[key];
          }
        }
        break;

      case 'clear':
        for (const key in stateClone) {
          delete stateClone[key];
        }
        break;

      default:
        break;
    }

    stateCloneHistory.push({ ...stateClone });
  }

  return stateCloneHistory;
}

module.exports = transformStateWithClones;
