'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clone = { ...state };
  const versions = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        for (const key in action.extraData) {
          clone[key] = action.extraData[key];
        }
        versions.push({ ...clone });
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          if (clone.hasOwnProperty(key)) {
            delete clone[key];
          }
        }
        versions.push({ ...clone });
        break;

      default:
        for (const key in clone) {
          delete clone[key];
        }
        versions.push({ ...clone });
    }
  }

  return versions;
}

module.exports = transformStateWithClones;
