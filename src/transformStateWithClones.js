'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  const stateCopy = { ...state };

  for (const obj of actions) {
    switch (obj.type) {
      case 'addProperties':
        for (const key in obj.extraData) {
          stateCopy[key] = obj.extraData[key];
        }
        stateHistory.push({ ...stateCopy });
        break;

      case 'removeProperties':
        for (const key of obj.keysToRemove) {
          delete stateCopy[key];
        }
        stateHistory.push({ ...stateCopy });
        break;

      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        stateHistory.push({ ...stateCopy });
        break;
    }
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
