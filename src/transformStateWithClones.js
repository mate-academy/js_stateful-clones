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

  for (const version of actions) {
    switch (version.type) {
      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        break;

      case 'addProperties':
        Object.assign(stateCopy, version.extraData);
        break;

      case 'removeProperties':
        for (const removable of version.keysToRemove) {
          delete stateCopy[removable];
        }
        break;

      default:
        return 'Error';
    }

    stateVersions.push({ ...stateCopy });
  }

  return stateVersions;
}

module.exports = transformStateWithClones;
