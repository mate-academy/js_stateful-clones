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

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties': {
        Object.assign(stateClone, action.extraData);
        break;
      }

      case 'removeProperties': {
        action.keysToRemove.forEach(keyToRemove => {
          delete stateClone[keyToRemove];
        });

        break;
      }

      case 'clear': {
        for (const key in stateClone) {
          delete stateClone[key];
        }

        break;
      }

      default:
        throw new Error('Uncorect state type');
    }

    stateHistory.push({ ...stateClone });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
