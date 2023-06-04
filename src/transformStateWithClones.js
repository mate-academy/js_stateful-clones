'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateVersions = [];
  const stateVersion = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'removeProperties':
        for (const keyToRemove of action.keysToRemove) {
          if (Object.keys(stateVersion).includes(keyToRemove)) {
            delete stateVersion[keyToRemove];
          }
        }
        break;
      case 'addProperties':
        Object.assign(stateVersion, action.extraData);
        break;
      case 'clear':
        for (const stateVersionKey in stateVersion) {
          delete stateVersion[stateVersionKey];
        }
        break;
      default:
        break;
    }
    stateVersions.push({ ...stateVersion });
  }

  return stateVersions;
}

module.exports = transformStateWithClones;
