'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateVersion = Object.assign({}, state);
  const stateVersions = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        for (const key in action.extraData) {
          stateVersion[key] = action.extraData[key];
        };
        break;

      case 'removeProperties' :
        for (const key of action.keysToRemove) {
          delete stateVersion[key];
        };
        break;

      case 'clear':
        for (const key in stateVersion) {
          delete stateVersion[key];
        };
        break;
    }
    stateVersions.push({ ...stateVersion });
  }

  return stateVersions;
}

module.exports = transformStateWithClones;
