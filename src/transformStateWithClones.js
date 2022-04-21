'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const stateVersions = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        for (const data in action.extraData) {
          stateCopy[data] = action.extraData[data];
        }
        stateVersions.push({ ...stateCopy });
        break;

      case 'removeProperties':
        for (const keyToRemove of action.keysToRemove) {
          if (keyToRemove in stateCopy) {
            delete stateCopy[keyToRemove];
          }
        }
        stateVersions.push({ ...stateCopy });
        break;

      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        stateVersions.push({ ...stateCopy });
        break;
    }
  }

  return stateVersions;
}

module.exports = transformStateWithClones;
