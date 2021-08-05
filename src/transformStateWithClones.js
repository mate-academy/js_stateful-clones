'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateLogs = [];
  const stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;
      case 'removeProperties':
        for (const entriesToRemove of action.keysToRemove) {
          delete stateCopy[entriesToRemove];
        }
        break;
      case 'clear':
        for (const entriesToRemove in stateCopy) {
          delete stateCopy[entriesToRemove];
        }
        break;
    }
    stateLogs.push({ ...stateCopy });
  }

  return stateLogs;
}

module.exports = transformStateWithClones;
