'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateLogs = [];
  let stateCopy = { ...state };

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
        stateCopy = {};
        break;
      default: return 'ERROR. Check if the input is correct';
    }
    stateLogs.push({ ...stateCopy });
  }

  return stateLogs;
}

module.exports = transformStateWithClones;
