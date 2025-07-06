'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  const newState = { ...state };

  for (const key of actions) {
    switch (key.type) {
      case 'addProperties':
        for (const key2 in key.extraData) {
          newState[key2] = key.extraData[key2];
        }

        break;
      case 'removeProperties':
        for (const key2 of key.keysToRemove) {
          delete newState[key2];
        }

        break;
      case 'clear':
        for (const key3 in newState) {
          delete newState[key3];
        }

        break;
    }
    stateHistory.push({ ...newState });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
