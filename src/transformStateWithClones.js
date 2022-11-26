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
        Object.assign(stateCopy, action.extraData);
        stateVersions.push({ ...stateCopy });
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
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
