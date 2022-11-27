'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const allStateVersions = [];
  const stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        for (const keys of action.keysToRemove) {
          delete stateCopy[keys];
        }
        break;

      case 'clear':
        for (const properties in stateCopy) {
          delete stateCopy[properties];
        }
        break;

      default:
        break;
    }

    allStateVersions.push({ ...stateCopy });
  }

  return allStateVersions;
}

module.exports = transformStateWithClones;
