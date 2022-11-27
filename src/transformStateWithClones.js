'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clone = { ...state };
  const stateVersions = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(clone, action.extraData);
        break;

      case 'removeProperties':
        for (const keysToRemove of action.keysToRemove) {
          delete clone[keysToRemove];
        }
        break;

      case 'clear':
        for (const key in clone) {
          delete clone[key];
        }
        break;

      default:
        break;
    }

    stateVersions.push({ ...clone });
  }

  return stateVersions;
}

module.exports = transformStateWithClones;
