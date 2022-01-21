'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const action = Object.values(actions);

  const stateCopy = { ...state };
  const stateVersions = [];

  for (const key of action) {
    switch (key.type) {
      case 'addProperties':
        for (const property in key.extraData) {
          stateCopy[property] = key.extraData[property];
        }

        stateVersions.push({ ...stateCopy });
        break;

      case 'removeProperties':
        for (const property of key.keysToRemove) {
          delete stateCopy[property];
        }

        stateVersions.push({ ...stateCopy });
        break;

      case 'clear':
        for (const property in stateCopy) {
          delete stateCopy[property];
        }

        stateVersions.push({ ...stateCopy });
        break;

      default:
        break;
    }
  }

  return stateVersions;
}

module.exports = transformStateWithClones;
