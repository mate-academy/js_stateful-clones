'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateVersions = [];
  const stateCopy = { ...state };

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

      default:
        for (const keyToDelete in stateCopy) {
          delete stateCopy[keyToDelete];
        }
    }
    stateVersions.push({ ...stateCopy });
  }

  return stateVersions;
}

module.exports = transformStateWithClones;
